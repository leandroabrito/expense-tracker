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


// Init app
function init() {
  listElement.innerHTML = '';
  transactions.forEach(addTransactionDOM);
}

init();
