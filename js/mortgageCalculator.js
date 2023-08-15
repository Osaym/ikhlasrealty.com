document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('mortgage-form');
    const loanAmount = document.getElementById('loan-amount');
    const interestRate = document.getElementById('interest-rate');
    const loanTerm = document.getElementById('loan-term');
    const monthlyPayment = document.getElementById('monthly-payment');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const principal = parseFloat(loanAmount.value);
      const rate = parseFloat(interestRate.value) / 100 / 12;
      const term = parseFloat(loanTerm.value) * 12;
  
      const monthly = (principal * rate * (Math.pow(1 + rate, term))) / (Math.pow(1 + rate, term) - 1);
  
      monthlyPayment.value = monthly.toFixed(2);
    });
  });