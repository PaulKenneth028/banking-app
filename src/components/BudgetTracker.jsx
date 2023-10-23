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
    const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
    if (storedAccounts) {
      const currentUser = storedAccounts.find((account) => account.username === user.username);
      if (currentUser && currentUser.budgetTracker) {
        setExpenses(currentUser.budgetTracker);
      }
    }
  }, [user]);

const updateExpenses = (updatedExpenses) => {
    const updatedUser = {
      ...user,
      budgetTracker: updatedExpenses,
    };

    const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
    const updatedAccounts = storedAccounts.map((account) =>
      account.username === user.username ? updatedUser : account
    );

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setExpenses(updatedExpenses);
  };


const handleAddExpense = () => {
    if (expenseName && expenseAmount && selectedCategory) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
        category: selectedCategory,
      };

      const updatedExpenses = [...expenses, newExpense];
        setExpenseName("");
        setExpenseAmount("");
        updateExpenses(updatedExpenses);
    }
};

const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
      updatedExpenses.splice(index, 1);
      updateExpenses(updatedExpenses); 
};

const handleEditExpense = (index) => {
    const expenseToEdit = expenses[index];
      setEditExpenseIndex(index);
      setEditExpenseName(expenseToEdit.name);
      setEditExpenseAmount(expenseToEdit.amount);
};

  const handleSaveExpense = (index) => {
    if (editExpenseName && editExpenseAmount) {
      const updatedExpenses = [...expenses];
        updatedExpenses[index] = {
          name: editExpenseName,
          amount: parseFloat(editExpenseAmount),
          category: selectedCategory,
        };
      updateExpenses(updatedExpenses);
      setEditExpenseIndex(null);
    }
};


const handleChange = (e) => {
    const { name, value } = e.target;
      if (name === "expenseName") {
        setExpenseName(value);
      } else if (name === "expenseAmount") {
        setExpenseAmount(value);
      } else if (name === "category") { 
        setSelectedCategory(value);
      }
};

const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
};

const toDash = () => {
    setCurrentPage("dashboard");
};

const categoryOptions = ["Food", "Transportation", "Electricity", "Water"];

return (
    <>
    
      <h1 className="title">Budget Tracker</h1>
      <div className="flex-container">
        <select name="category" value={selectedCategory} onChange={handleChange}>
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
            </>
          ) : (
            <span>
              {expense.name}: P{expense.amount}
            </span>
          )}

          {editExpenseIndex === i ? (
            <button
              style={{ padding: "5px" }}
              onClick={() => handleSaveExpense(i)}
            >
              Save
            </button>
          ) : (
            <button
              style={{ padding: "5px" }}
              onClick={() => handleEditExpense(i)}
            >
              Edit
            </button>
          )}

          <button
            style={{ padding: "5px" }}
            onClick={() => handleDeleteExpense(i)}
          >
            X
          </button>
        </div>
        
      ))}
      <div className="flex-container">
        <input
          type="text"
          name="expenseName"
          value={expenseName}
          placeholder="Expense Name"
          onChange={handleChange}
          disabled={!selectedCategory}
        />
        <input
          type="number"
          name="expenseAmount"
          value={expenseAmount}
          placeholder="Expense Amount"
          onChange={handleChange}
          disabled={!selectedCategory}
        />
        <button onClick={handleAddExpense} disabled={!selectedCategory} className="add-button">Add Expense</button>
      </div>
      <div className="flex-container">
        <strong className="total-expenses">Total Expenses: P{calculateTotalExpenses().toFixed(2)}</strong>
      </div>
      <div className="flex-container">
        <button onClick={toDash} className="dashboard-button">Dashboard</button>
      </div>
    </>
  );
};

export default BudgetTracker;
