const calculateButton = document.getElementById('calculateButton');
calculateButton.addEventListener('click', calculateMortgage);

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetCalculator);

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function calculateMortgage() {
  const loanAmountInput = parseFloat(document.getElementById('loanAmount').value);
  const downPaymentInput = parseFloat(document.getElementById('downPayment').value);
  const interestRateInput = parseFloat(document.getElementById('interestRate').value) / 100;
  const propertyInsuranceInput = parseFloat(document.getElementById('propertyInsurance').value);
  const propertyTaxesInput = parseFloat(document.getElementById('propertyTaxes').value);

  const isValidInput = [loanAmountInput, downPaymentInput, interestRateInput, propertyInsuranceInput, propertyTaxesInput].every(isNumeric);
  
  if (!isValidInput) {
    alert('ERROR: A non-numeric value has been detected in one of the calculation fields.\n\nPlease review your inputs and correct this error.\n\nIf this error persists, please click the reset button to clear the calculator, and enter your values again.');
    return;
  }

  let loanTerm;
  const selectedLoanTerm = document.getElementById('loanTerm').value;
  if (selectedLoanTerm === 'custom') {
    loanTerm = parseFloat(document.getElementById('customLoanTerm').value);
    if (!isNumeric(loanTerm)) {
      alert('Please enter a valid numeric custom loan term.');
      return;
    }
  } else {
    loanTerm = parseFloat(selectedLoanTerm);
  }

  const principalAmount = loanAmountInput - downPaymentInput;

  const monthlyInterestRate = interestRateInput / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment = (principalAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principalAmount;

  const annualPropertyExpenses = propertyInsuranceInput + propertyTaxesInput;
  const monthlyPropertyExpenses = annualPropertyExpenses / 12;

  const totalMonthlyPayment = monthlyPayment + monthlyPropertyExpenses;
  const totalPaymentWithExpenses = totalPayment + annualPropertyExpenses;

  let resultHTML = `
    <div class="result-container">
      <h2>Final Calculations</h2>
      <p>Monthly Payment: ${formatCurrency(monthlyPayment)}</p>
      <p>Total Payment: ${formatCurrency(totalPayment)}</p>
      <p>Total Interest Paid: ${formatCurrency(totalInterest)}</p>
      <p>Loan-to-Value Ratio: ${(principalAmount / (loanAmountInput - downPaymentInput) * 100).toFixed(2)}%</p>
      <p>Monthly Property Expenses: ${formatCurrency(monthlyPropertyExpenses)}</p>
      <p>Total Monthly Payment (including expenses): ${formatCurrency(totalMonthlyPayment)}</p>
      <p>Total Payment (including expenses): ${formatCurrency(totalPaymentWithExpenses)}</p>
    </div>
  `;

  document.getElementById('result').innerHTML = resultHTML;
}

function resetCalculator() {
  document.getElementById('mortgageForm').reset();
  document.getElementById('customLoanTerm').style.display = 'none';
  document.getElementById('result').innerHTML = '';
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Show custom loan term input when "Custom" option is selected
document.getElementById('loanTerm').addEventListener('change', function() {
  const customLoanTermInput = document.getElementById('customLoanTerm');
  if (this.value === 'custom') {
    customLoanTermInput.style.display = 'inline-block';
  } else {
    customLoanTermInput.style.display = 'none';
  }
});