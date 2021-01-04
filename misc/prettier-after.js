const accounts = [
  {
    account_number: '0000001',
    account_name: 'checking account',
    balance: '100',
  },
  {
    account_number: '0000002',
    account_name: 'savings account',
    balance: '1200',
  },
  {
    account_number: '0000003',
    account_name: 'credit card',
    balance: '-120.20',
  },
];

function calculateTotal() {
  return accounts
    .map((account) => Number(account.balance))
    .reduce((total, balance) => total + balance, 0);
}

const total = calculateTotal();
console.log('Total balance ' + total.toFixed(2));
