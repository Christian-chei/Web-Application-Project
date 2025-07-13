
import React, { useState } from 'react';

const App = () => {
  const [tripBudget, setTripBudget] = useState('');
  const [showKenyaSuggestion, setShowKenyaSuggestion] = useState(false);
  const [totalBudget, setTotalBudget] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const checkBudget = () => {
    const budget = parseFloat(tripBudget);
    if (isNaN(budget) || budget <= 0) {
      alert('Please enter a valid budget amount.');
      setShowKenyaSuggestion(false);
      return;
    }
    if (budget <= 1000) {
      setShowKenyaSuggestion(true);
    } else {
      alert('We are working on suggestions for higher budgets!');
      setShowKenyaSuggestion(false);
    }
  };

  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    if (!expenseName || isNaN(amount)) {
      alert('Enter valid expense name and amount.');
      return;
    }
    const newExpenses = [...expenses, { name: expenseName, amount }];
    setExpenses(newExpenses);
    setTotalSpent(prev => prev + amount);
    setExpenseName('');
    setExpenseAmount('');
  };

  const removeExpense = (index) => {
    const amount = expenses[index].amount;
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
    setTotalSpent(prev => prev - amount);
  };

  const redirectToKenya = () => {
    window.location.href = 'Travel_Kenya.html';
  };

  const handleSearch = () => {
    if (searchInput.toLowerCase().includes('kenya')) {
      redirectToKenya();
    } else {
      alert("Sorry, we currently support only 'Kenya' as a destination.");
    }
  };

  const remainingBudget = parseFloat(totalBudget || 0) - totalSpent;

  return (
    <div>
      <header>
        <h1>Trip Planner</h1>
      </header>

      <section>
        <h2>Plan Your Perfect Getaway</h2>
        <input
          type="text"
          placeholder="Search destination..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      <section>
        <h2>Plan Your Trip by Budget</h2>
        <input
          type="number"
          value={tripBudget}
          onChange={e => setTripBudget(e.target.value)}
          placeholder="e.g. 1000"
        />
        <button onClick={checkBudget}>Suggest Destination</button>
        {showKenyaSuggestion && (
          <div>
            <p>We recommend <strong>Kenya</strong>!</p>
            <button onClick={redirectToKenya}>Go to Kenya Travel Page</button>
          </div>
        )}
      </section>

      <section>
        <h2>Budget Tracker</h2>
        <input
          type="number"
          placeholder="Total Budget"
          value={totalBudget}
          onChange={e => setTotalBudget(e.target.value)}
        />
        <input
          type="text"
          placeholder="Expense name"
          value={expenseName}
          onChange={e => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={e => setExpenseAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>

        <p>Total Spent: ${totalSpent.toFixed(2)} | Remaining: ${remainingBudget.toFixed(2)}</p>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.name}: ${expense.amount.toFixed(2)}
              <button onClick={() => removeExpense(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;
