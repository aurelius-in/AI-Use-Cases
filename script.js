document.addEventListener('DOMContentLoaded', () => {
    fetch('useCases.json')
        .then(response => response.json())
        .then(data => {
            setupSearch(data);
            // Store the use cases globally so that they can be accessed in the search button click event
            window.useCases = data;
        })
        .catch(error => console.error('Error loading use cases:', error));
});

function setupSearch(useCases) {
    document.getElementById('search-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchUseCases(useCases);
        }
    });

    document.querySelector('.search-section button').addEventListener('click', function () {
        searchUseCases(useCases);
    });
}

function searchUseCases(useCases) {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = useCases.filter(useCase =>
        useCase.industry.toLowerCase().includes(query) ||
        useCase.title.toLowerCase().includes(query) ||
        useCase.description.toLowerCase().includes(query) ||
        useCase.benefits.toLowerCase().includes(query) ||
        useCase.challenges.toLowerCase().includes(query) ||
        useCase.implementationTips.toLowerCase().includes(query) ||
        useCase.additionalInfo.toLowerCase().includes(query)
    );
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
