const useCases = [
    {
        industry: 'Healthcare',
        title: 'AI for Medical Diagnosis',
        description: 'Using AI to diagnose diseases from medical imaging.',
        benefits: 'Improves accuracy and speed of diagnosis.',
        challenges: 'Data privacy concerns and need for large datasets.',
        implementationTips: 'Ensure data is anonymized and secure, and use diverse datasets for training.',
        additionalInfo: 'One notable application of AI in medical diagnosis is in the detection of breast cancer through mammography. Studies have shown that AI systems can match or even surpass the accuracy of radiologists. By analyzing thousands of mammograms, these systems learn to identify patterns associated with cancerous and non-cancerous tissues. This technology not only aids in early detection but also reduces the workload on healthcare professionals, allowing them to focus on more complex cases. Another promising area is the use of AI for predicting patient outcomes based on historical data. By examining past patient records, AI algorithms can identify risk factors and predict potential complications, enabling doctors to intervene earlier. However, these systems require rigorous validation and continuous monitoring to ensure they remain accurate and unbiased.'

    },
    {
        industry: 'Finance',
        title: 'Fraud Detection',
        description: 'AI systems to detect and prevent fraudulent transactions.',
        benefits: 'Reduces financial losses and increases security.',
        challenges: 'High false-positive rates and need for real-time processing.',
        implementationTips: 'Continuously update models with new data and ensure robust testing.',
        additionalInfo: 'Financial institutions have increasingly turned to AI to enhance their fraud detection capabilities. For instance, machine learning models can analyze vast amounts of transaction data in real-time to spot unusual patterns indicative of fraud. These systems use a variety of techniques, including anomaly detection, neural networks, and clustering algorithms, to identify potentially fraudulent activities. One key advantage of AI in this context is its ability to learn and adapt over time, improving its accuracy as more data is processed. In addition to detecting fraud, AI can also be used to prevent it by flagging suspicious activities before they result in significant financial losses. For example, credit card companies can use AI to monitor transactions and immediately alert customers to potential fraud, allowing for rapid response and mitigation. Implementing AI for fraud detection also involves integrating it with existing security systems and ensuring that it complies with regulatory requirements.'

    }
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
