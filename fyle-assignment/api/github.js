import { Octokit } from "https://esm.sh/octokit";
import { rawData } from "../constants/rawData.js";

export class OctokitAPI {
    constructor() { }

    async activate() {
        try {
            this.loadingOPtions = {
                'USER_PROFILE': 'USER_PROFILE',
                'REPOS': 'REPOS',
                'LANGUAGES': 'LANGUAGES'
            };
            this.loading = '';
            this.error = '';
            const response = await fetch('https://fyle-api.onrender.com/api/github-token');
            const data = await response.json();
            const githubToken = data.token;
            this.octokit = new Octokit({
                auth: githubToken
            });
            this.userData = {};
            this.reposData = {};
        } catch (error) {
            console.error('Error initializing:', error);
        }
    }

    async getUser(username) {
        try {
            this.loading = this.loadingOPtions.USER_PROFILE;
            this.error = '';
            const response = await this.octokit.rest.users.getByUsername({ username });
            this.userData = response.data;
            this.loading = '';
        } catch (error) {
            if (navigator.onLine) {
                this.error = rawData().errorTypeOptions.invalid_user;
            }
            else {
                this.error = rawData().errorTypeOptions.network_error;
            }
        }
    }

    async getRepos(username, page, per_page) {
        try {
            this.loading = this.loadingOPtions.REPOS;
            this.error = '';
            const response = await this.octokit.rest.repos.listForUser({
                username,
                per_page: per_page ? per_page : 10,
                page: page ? page : 1,
            });

            for (const repo of response.data) {
                await this.getLanguages(username, repo);
            }

            this.reposData = response.data;
            this.loading = '';
        } catch (error) {
            if (navigator.onLine) {
                this.error = rawData().errorTypeOptions.fetch_error;
            }
            else {
                this.error = rawData().errorTypeOptions.network_error;
            }
        }
    }

    async getLanguages(owner, repo) {
        try {
            this.loading = this.loadingOPtions.LANGUAGES;
            this.error = false;
            const response = await this.octokit.rest.repos.listLanguages({
                owner,
                repo: repo.name
            });

            repo.languages = Object.keys(response.data);
            this.loading = '';
        } catch (error) {
            if (navigator.onLine) {
                this.error = rawData().errorTypeOptions.fetch_error;
            }
            else {
                this.error = rawData().errorTypeOptions.network_error;
            }
        }
    }
}


