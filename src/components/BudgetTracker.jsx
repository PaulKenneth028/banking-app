import React, { useState, useEffect } from "react";
import "./BudgetTracker.css";

const BudgetTracker = (props) => {
  const { user, setUser, setCurrentPage } = props;
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [editExpenseIndex, setEditExpenseIndex] = useState(null);
  const [editExpenseName, setEditExpenseName] = useState("");
  const [editExpenseAmount, setEditExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
    if (storedAccounts) {
      const currentUser = storedAccounts.find((account) => account.username === user.username);
      if (currentUser && currentUser.budgetTracker) {
        setExpenses(currentUser.budgetTracker);
      }
    }
  }, [user]);

  const updateLocalStorage = (updatedUser) => {
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const updatedAccounts = storedAccounts.map((account) =>
      account.username === user.username ? updatedUser : account
    );
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
  };

  const handleAddExpense = () => {
    if (isValidExpense()) {
      const amount = parseFloat(expenseAmount);
      const newExpense = {
        name: expenseName,
        amount,
        category: selectedCategory,
      };
      const updatedExpenses = [...expenses, newExpense];
      const updatedUser = {
        ...user,
        currentBalance: user.currentBalance - amount,
        budgetTracker: updatedExpenses,
      };
      updateUserData(updatedExpenses, updatedUser);
    }
  };

  const handleDeleteExpense = (index) => {
    if (index >= 0 && index < expenses.length) {
      const deletedExpense = expenses[index];
      const updatedExpenses = [...expenses];
      updatedExpenses.splice(index, 1);
      const updatedUser = {
        ...user,
        currentBalance: user.currentBalance + deletedExpense.amount,
        budgetTracker: updatedExpenses,
      };
      updateUserData(updatedExpenses, updatedUser);
    }
  };

  const handleEditExpense = (index) => {
    if (index >= 0 && index < expenses.length) {
      const expenseToEdit = expenses[index];
      setEditExpenseIndex(index);
      setEditExpenseName(expenseToEdit.name);
      setEditExpenseAmount(expenseToEdit.amount);
    }
  };

  const handleSaveExpense = (index) => {
    if (editExpenseName && editExpenseAmount) {
      const updatedExpenses = [...expenses];
      const oldExpense = updatedExpenses[index];
      const updatedUser = {
        ...user,
        currentBalance: user.currentBalance + oldExpense.amount - parseFloat(editExpenseAmount),
      };
      updatedExpenses[index] = {
        name: editExpenseName,
        amount: parseFloat(editExpenseAmount),
        category: selectedCategory,
      };
      updateUserData(updatedExpenses, updatedUser);
      setEditExpenseIndex(null);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const isValidExpense = () => {
    if (expenseName && expenseAmount && selectedCategory) {
      const amount = parseFloat(expenseAmount);
      return !isNaN(amount);
    }
    return false;
  };

  const updateUserData = (updatedExpenses, updatedUser) => {
    updateLocalStorage(updatedUser);
    setUser(updatedUser);
    setExpenses(updatedExpenses);
    setExpenseName("");
    setExpenseAmount("");
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const toDashboard = () => {
    setCurrentPage("dashboard");
  };

  const categoryOptions = ["Food", "Transportation", "Electricity", "Water"]; // Removed the trailing comma

  return (
    <>
      <h1 className="title">Budget Tracker: P{user.currentBalance}</h1>
      <div className="flex-container">
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Select Category</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {expenses.map((expense, i) => (
  <div className="expense-item" key={i}>
    <p>Category: {expense.category}</p>
    <p>Name: {expense.name}</p>
    <p>Amount: P{expense.amount}</p>
    {editExpenseIndex === i ? (
      <>
        <input
          type="text"
          name="editExpenseName"
          value={editExpenseName}
          onChange={(e) => setEditExpenseName(e.target.value)}
          placeholder="Edit Expense Name"
        />
        <input
          type="number"
          name="editExpenseAmount"
          value={editExpenseAmount}
          onChange={(e) => setEditExpenseAmount(e.target.value)}
          placeholder="Edit Expense Amount"
        />
        <button style={{ padding: "5px" }} onClick={() => handleSaveExpense(i)}>
          Save
        </button>
      </>
    ) : (
      <>
        <button style={{ padding: "5px" }} onClick={() => handleEditExpense(i)}>
          Edit
        </button>
        <button style={{ padding: "5px" }} onClick={() => handleDeleteExpense(i)}>
          X
        </button>
      </>
    )}
  </div>
))}


      <div className="flex-container">
        <input
          type="text"
          name="expenseName"
          value={expenseName}
          placeholder="Expense Name"
          onChange={(e) => setExpenseName(e.target.value)}
          disabled={!selectedCategory}
        />
        <input
          type="number"
          name="expenseAmount"
          value={expenseAmount}
          placeholder="Expense Amount"
          onChange={(e) => setExpenseAmount(e.target.value)}
          disabled={!selectedCategory}
        />
        <button onClick={handleAddExpense} disabled={!selectedCategory} className="add-button">
          Add Expense
        </button>
      </div>
      <div className="flex-container">
        <strong className="total-expenses">Total Expenses: P{calculateTotalExpenses().toFixed(2)}</strong>
      </div>
      <div className="flex-container">
        <button onClick={toDashboard} className="dashboard-button">
          Dashboard
        </button>
      </div>
    </>
  );
};

export default BudgetTracker;
