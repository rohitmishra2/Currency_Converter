// Function to fetch exchange rates from API
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        return data.rates;
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        return null;
    }
}

// Function to populate currency options
async function populateCurrencyOptions() {
    const rates = await fetchExchangeRates();
    if (!rates) return;

    const currencyOptions = Object.keys(rates);

    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');

    currencyOptions.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toSelect.appendChild(option2);
    });
}

// Function to perform currency conversion
function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const result = amount * exchangeRate;
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Failed to perform conversion:', error);
            alert('Failed to perform conversion. Please try again later.');
        });
}

// Populate currency options on page load
document.addEventListener('DOMContentLoaded', () => {
    populateCurrencyOptions();
});
