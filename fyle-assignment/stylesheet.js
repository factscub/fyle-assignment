function loadCSSFile(filename) {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = `stylesheets/${filename}`;
    document.head.appendChild(linkElement);
}

// Array of CSS file names
const cssFiles = ['search.css', 'user-profile.css', 'user-repo.css', 'pagination.css', 'loader.css', 'error.css'];

// Load each CSS file dynamically
cssFiles.forEach(loadCSSFile);
