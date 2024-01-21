# fyle-assignment
## Email: `bethasiva7780@gmail.com`
### HOSTED LINK: [https://fyle-assignment-siva.netlify.app/](https://fyle-assignment-siva.netlify.app/)


## Steps to test on local:
1. Download extension for VS code: ![image](https://github.com/factscub/fyle-assignment/assets/107513341/3637a0b3-9e22-46ff-b0ca-753003ca1e90)
2. Go to the link, generate Token and copy the token: [https://github.com/settings/tokens](https://github.com/settings/tokens)
3. Go to github.js file in the repo: `api/github.js`
4. You find this code on line 19 : `this.octokit = new Octokit({
                auth: githubToken
            });
   `
5. Now paste the copied token like this: `this.octokit = new Octokit({
                auth: 'paste github token here'
            });`
6. Finally, at the bottom click `Go live`: ![image](https://github.com/factscub/fyle-assignment/assets/107513341/c48c5e53-e7ec-4606-a3b1-b9c942bda26d)
7. You can start testing the build now.
