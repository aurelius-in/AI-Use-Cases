document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
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
            window.useCases = data; // Store globally for button click access
        })
        .catch(error => console.error('Error loading use cases:', error));
});

function setupSearch(useCases) {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (!searchInput || !searchButton) {
        console.error('Search input or button not found in the DOM');
        return;
    }

    searchInput.addEventListener('input', debounce(() => searchUseCases(useCases), 300));
    searchButton.addEventListener('click', function () {
        searchUseCases(useCases);
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

function searchUseCases(useCases) {
    const query = document.getElementById('search-input').value.toLowerCase();
    console.log('Search query:', query);
    const results = useCases.filter(useCase =>
        useCase.industry.toLowerCase().includes(query) ||
        useCase.title.toLowerCase().includes(query) ||
        useCase.description.toLowerCase().includes(query) ||
        useCase.benefits.toLowerCase().includes(query) ||
        useCase.challenges.toLowerCase().includes(query) ||
        useCase.implementationTips.toLowerCase().includes(query) ||
        useCase.additionalInfo.toLowerCase().includes(query)
    );
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
