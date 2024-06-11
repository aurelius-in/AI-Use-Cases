const useCases = [
    {
        industry: 'Healthcare',
        title: 'AI for Medical Diagnosis',
        description: 'Using AI to diagnose diseases from medical imaging.',
        benefits: 'Improves accuracy and speed of diagnosis.',
        challenges: 'Data privacy concerns and need for large datasets.',
        implementationTips: 'Ensure data is anonymized and secure, and use diverse datasets for training.'
    },
    {
        industry: 'Finance',
        title: 'Fraud Detection',
        description: 'AI systems to detect and prevent fraudulent transactions.',
        benefits: 'Reduces financial losses and increases security.',
        challenges: 'High false-positive rates and need for real-time processing.',
        implementationTips: 'Continuously update models with new data and ensure robust testing.'
    },
    // Add more use cases as needed
];

function searchUseCases() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = useCases.filter(useCase =>
        useCase.industry.toLowerCase().includes(query) ||
        useCase.title.toLowerCase().includes(query) ||
        useCase.description.toLowerCase().includes(query) ||
        useCase.benefits.toLowerCase().includes(query) ||
        useCase.challenges.toLowerCase().includes(query) ||
        useCase.implementationTips.toLowerCase().includes(query)
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
        `;
        resultsContainer.appendChild(useCaseElement);
    });
}

document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchUseCases();
    }
});
