export class Search {
    constructor({ initializeAPICalls }) {
        this.initializeAPICalls = initializeAPICalls;
    }

    startSearch() {
        var searchContainer = document.getElementById('search-container');
        var username = searchContainer.querySelector('.search-input').value.trim();
        if (username) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('username', username);
            urlParams.set('per_page', 10);
            urlParams.set('page', 1);
            const updatedUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
            window.location.href = updatedUrl
        }
    }

    htmlString() {
        return `
            <div id="search-container">
                <input type="text" class="search-input" id="searchInput" placeholder="Enter user name">
                <button class="search-button" >Search</button>
            </div>`;
    }

    attachEvents() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchContainer = document.getElementById('search-container');
        searchContainer.querySelector('.search-input').setAttribute('value', urlParams.get('username') || '')
        document.body.addEventListener('click', event => {
            if (event.target.classList.contains('search-button')) {
                this.startSearch()
            }
        });
    }
}