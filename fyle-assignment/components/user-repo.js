export function userRepo(repoData) {
    const { name, description, languages } = repoData;
    return `
        <div class="user-repo-comp">
            <div class="repo-details">
                <h2>${name}</h2>
                <p>${description ? description : ""}</p>
                ${Array.isArray(languages) ? `<div class="languages"> ${languages.map(lang => `<span>${lang}</span>`).join('')} </div>` : ''}
            </div>
        </div>
    `;
}