import React, { useState, useEffect } from "react";

const BudgetTracker = (props) => {
  const { user, setUser, setCurrentPage } = props;
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")

  useEffect(() => {
    updateUserAccount
  }, [expenses])

  const updateUserAccount = (expenses) => {
    const updatedUser = {
      ...user,
      budgetTracker: expenses, 
    };
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || []
    const updatedAccounts = storedAccounts.map((account) => {
      if (account.username === user.username) {
        return updatedUser; 
      }
      return account;
    });
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts))
  };

  const handleAddExpense = () => {
    if (expenseName && expenseAmount) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
      };

      const updatedExpenses = [...expenses, newExpense]
      setExpenses(updatedExpenses);

      setExpenseName("")
      setExpenseAmount("")

      updateUserAccount(updatedExpenses);
      console.log('updated expenses', updatedExpenses)
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1)
    setExpenses(updatedExpenses)

    updateUserAccount(updatedExpenses)
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "expenseName") {
      setExpenseName(value);
    } else if (name === "expenseAmount") {
      setExpenseAmount(value);
    }
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  };

  const toDash = () => {
    setCurrentPage("dashboard");
  };

  return (
    <>
      <h1 className="flex justify-center">Budget Tracker</h1>
      {expenses.map((expense, i) => (
        <div className="flex justify-center items-center" key={i}>
          <span>
            {expense.name}: P{expense.amount}
          </span>
          <button
            style={{ padding: "5px" }}
            onClick={() => handleDeleteExpense(i)}
          >
            X
          </button>
        </div>
      ))}
      <div className="flex justify-center">
        <input
          type="text"
          name="expenseName"
          value={expenseName}
          placeholder="Expense Name"
          onChange={handleChange}
        />
        <input
          type="number"
          name="expenseAmount"
          value={expenseAmount}
          placeholder="Expense Amount"
          onChange={handleChange}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div className="flex justify-center">
        <strong>Total Expenses: P{calculateTotalExpenses().toFixed(2)}</strong>
      </div>
      <div className="flex justify-center">
        <button onClick={toDash}>Dashboard</button>
      </div>
    </>
  );
};

export default BudgetTracker;
