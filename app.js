const balanceElement = document.getElementById('balance');
const moneyPlusElement = document.getElementById('money-plus');
const moneyMinusElement = document.getElementById('money-minus');
const listElement = document.getElementById('list');
const formElement = document.getElementById('form');
const textElement = document.getElementById('text');
const amountElement = document.getElementById('amount');
const btnSubmit = document.getElementById('btn');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

let transactions = dummyTransactions;

// Add transaction
function addTransaction(e) {
  e.preventDefault();
  if (textElement.value.trim() === '' || amountElement.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: textElement.value,
      amount: +amountElement.value
    };
  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  textElement.value = '';
  amountElement.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

// add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const itemLI = document.createElement('li');

  // Add class base on value
  itemLI.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  itemLI.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="btn-delete" onclick="removeTransactionDOM(${transaction.id})">x</button>
  `;

  listElement.appendChild(itemLI);
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  console.log(amounts);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed();

  console.log(total);

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

}

// Remove transaction by ID
function removeTransactionDOM(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  init();
}

// Init app
function init() {
  listElement.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

formElement.addEventListener('submit', addTransaction);
