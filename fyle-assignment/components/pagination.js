export class Pagination {
    constructor({ octokitAPI, username }) {
        this.urlParams = new URLSearchParams(window.location.search);
        this.username = username;
        this.octokitAPI = octokitAPI;
        this.perPage = Number(this.urlParams.get('per_page')) || 10;
        this.totalPages = Math.ceil(octokitAPI.userData.public_repos / this.perPage);
        this.page = Number(this.urlParams.get('page')) || 1;
    }

    startSearch(targetEl) {
        let page = Number(targetEl.getAttribute('data-page'));
        const perPage = Number(targetEl.getAttribute('data-perPage'));
        if (page > this.totalPages) {
            page = this.totalPages;
        } else if (page === 0) {
            page = 1;
        }

        if (this.username && page >= 1 && page <= this.totalPages) {
            this.urlParams.set('per_page', perPage);
            this.urlParams.set('page', page);
            const updatedUrl = `${window.location.origin}${window.location.pathname}?${this.urlParams.toString()}`;
            window.location.href = updatedUrl
        }
    }

    htmlString() {
        return `
            <div id="pagination">
                <div class="history-container">
                    <button class="go-previous">< Older</button>
                    <button class="go-forward">Newer ></button>                
                </div>
                <label for="perPage">Repositories Per Page (default is 10):<input type="number" id="perPage" min="10" max="100" value="${this.perPage}"></label>
                ${this.totalPagesHtml()}
            </div>
        `;
    }

    totalPagesHtml() {
        let htmlStr = '';
        for (let i = 1; i <= this.totalPages; i++) {
            htmlStr += `<button class="page ${this.page === i ? 'current' : ''}" data-perPage="${this.perPage}" data-page="${i}">${i}</button>`
        }

        return `<div class="pages">
            <button class="page" data-perPage="${this.perPage}" data-page="${this.page - 1}"><<</button>
            ${htmlStr}
            <button class="page" data-perPage="${this.perPage}" data-page="${this.page + 1}">>></button>
        </div>`;
    }

    attachEvents() {
        this.paginationEl = document.getElementById('pagination');

        let debounceId = null;
        document.body.addEventListener('input', event => {
            if (debounceId) {
                clearTimeout(debounceId);
            }

            debounceId = setTimeout(() => {
                const targetEl = event.target;
                if (targetEl.id === 'perPage') {
                    const minValue = parseInt(targetEl.min);
                    const maxValue = parseInt(targetEl.max);
                    let enteredValue = parseInt(targetEl.value);

                    if (isNaN(enteredValue) || enteredValue < minValue) {
                        enteredValue = minValue;
                    } else if (enteredValue > maxValue) {
                        enteredValue = maxValue;
                    }

                    targetEl.setAttribute('value', enteredValue);
                    this.paginationEl.querySelector('.pages').remove();
                    this.totalPages = Math.ceil(this.octokitAPI.userData.public_repos / enteredValue);
                    this.perPage = enteredValue;
                    this.paginationEl.innerHTML += this.totalPagesHtml();
                }
            }, 1000);
        });

        document.body.addEventListener('click', event => {
            if (event.target.classList.contains('page')) {
                this.startSearch(event.target)
            }
            else if (event.target.classList.contains('go-previous')) {
                goToPreviousPage();
            }
            else if (event.target.classList.contains('go-forward')) {
                goToForwardPage();
            }
        });

        function goToPreviousPage() {
            window.history.back();
        }

        function goToForwardPage() {
            window.history.forward();
        }
    }
}