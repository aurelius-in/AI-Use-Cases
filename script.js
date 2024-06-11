document.addEventListener('DOMContentLoaded', () => {
    fetch('useCases.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Use cases loaded:', data);
            setupSearch(data);
            // Initialize Fuse.js with options
            window.fuse = new Fuse(data, {
                keys: [
                    'industry',
                    'title',
                    'description',
                    'benefits',
                    'challenges',
                    'implementationTips',
                    'additionalInfo'
                ],
                threshold: 0.3
            });
        })
        .catch(error => console.error('Error loading use cases:', error));
});

function setupSearch(useCases) {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-section button');

    searchInput.addEventListener('input', debounce(() => searchUseCases(), 300));
    searchButton.addEventListener('click', function () {
        searchUseCases();
    });
}

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function searchUseCases() {
    const query = document.getElementById('search-input').value;
    console.log('Search query:', query);
    const results = window.fuse.search(query).map(result => result.item);
    console.log('Search results:', results);
    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }
    results.forEach(useCase => {
        const useCaseElement = document.createElement('div');
        useCaseElement.className = 'use-case';
        useCaseElement.innerHTML = `
            <h2>${useCase.title}</h2>
            <p><strong>Industry:</strong> ${useCase.industry}</p>
            <p><strong>Description:</strong> ${useCase.description}</p>
            <p><strong>Benefits:</strong> ${useCase.benefits}</p>
            <p><strong>Challenges:</strong> ${useCase.challenges}</p>
            <p><strong>Implementation Tips:</strong> ${useCase.implementationTips}</p>
            <p><strong>Additional Info:</strong> ${useCase.additionalInfo}</p>
        `;
        resultsContainer.appendChild(useCaseElement);
    });
}
