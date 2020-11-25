const balanceElement = document.getElementById('balance');
const moneyPlusElement = document.getElementById('money-plus');
const moneyMinusElement = document.getElementById('money-minus');
const listElement = document.getElementById('list');
const formElement = document.getElementById('form');
const textElement = document.getElementById('text');
const amountElement = document.getElementById('btn');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

let transactions = dummyTransactions;

// add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const itemLI = document.createElement('li');

  // Add class base on value
  itemLI.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  itemLI.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="btn-delete">x</button>
  `;

  listElement.appendChild(itemLI);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed();

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)
  ;

  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);

  balanceElement.innerText = `R$ ${total}`;
  moneyPlusElement.innerText = `R$ ${income}`;
  moneyMinusElement.innerText = `R$ ${expense}`;

  console.log(expense);
}


// Init app
function init() {
  listElement.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
