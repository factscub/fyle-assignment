export function userProfileComp(userData) {
    const { avatar_url, login, location, twitter_username, html_url } = userData;
    return `
        <div class="user-profile-comp">
            <div class="details-container">    
                <div class="image-container">
                    <img src="${avatar_url}"/>
                </div>
                <div class="user-details">
                    <h1>${login}</h1>
                    ${location || twitter_username ? "<p>Bio goes here</p>":""}
                    ${location ? `<p><img src="../assets/location.svg"/>${location}</p>` : ""}
                    ${twitter_username ? `<p>Twitter: <a target="_blank" href="https://twitter.com/${twitter_username}">${twitter_username}</a></p>` : ""}
                </div>
            </div>
            <p><img src="../assets/link.svg"/><a target="_blank" href="${html_url}">${html_url}</a></p>
        </div>
    `;
}