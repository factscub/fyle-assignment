import { Search } from './components/search.js';
import { userProfileComp } from './components/user-profile.js';
import { userRepo } from "./components/user-repo.js";
import { loader } from './components/loader.js';
import { OctokitAPI } from './api/github.js';
import { error } from './components/error.js';
import { Pagination } from './components/pagination.js';

export default class Script {
    constructor() {
        this.activate();
    }

    async activate() {
        this.templateContainer = document.getElementById('template-container');
        this.octokitAPI = new OctokitAPI();
        this.templateContainer.innerHTML += loader();
        await this.octokitAPI.activate();
        this.templateContainer.querySelector('.loader').remove();
        this.urlParams = new URLSearchParams(window.location.search);
        this.username = this.urlParams.get('username');
        this.per_page = this.urlParams.get('per_page');
        this.page = this.urlParams.get('page');
        this.search = new Search({ initializeAPICalls: this.initializeAPICalls });
        this.templateContainer.innerHTML += this.search.htmlString();
        this.search.attachEvents();
        if (this.username) {
            try {
                await this.initializeAPICalls();
            } catch (error) {
                console.log(error);
            }
        }
    }

    async initializeAPICalls() {
        this.templateContainer.innerHTML += loader();
        await this.octokitAPI.getUser(this.username);

        if (this.errorMsg()) return;

        this.templateContainer.querySelector('.loader').remove();
        const userProfileTemplate = userProfileComp(this.octokitAPI.userData);
        this.templateContainer.innerHTML += userProfileTemplate;
        this.templateContainer.innerHTML += loader();
        await this.octokitAPI.getRepos(this.username, this.page, this.per_page);

        if (this.errorMsg()) return;

        let userRepoTemplate = '';
        for (const repo of this.octokitAPI.reposData) {
            if (this.errorMsg()) break;
            userRepoTemplate += userRepo(repo);
        }

        if (this.errorMsg()) return;

        this.templateContainer.querySelector('.loader').remove();
        this.templateContainer.innerHTML += userRepoTemplate;
        const pagination = new Pagination({ octokitAPI: this.octokitAPI, username: this.username });
        this.templateContainer.innerHTML += pagination.htmlString();
        pagination.attachEvents();
    }

    errorMsg() {
        if (this.octokitAPI.error) {
            this.templateContainer.querySelector('.loader').remove();
            this.templateContainer.innerHTML += error(this.octokitAPI.error);
            return true;
        }
    }
}


