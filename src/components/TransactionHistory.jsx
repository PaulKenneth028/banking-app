import React, {useState, useEffect} from "react";


const TransactionHistory = (props) => {
    const { user, setCurrentPage } = props
  
    const toDash = () => {
        setCurrentPage('dashboard')
      }

    return (
      <div>
        <h1>Transaction History</h1>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={transactionDescription}
            onChange={(e) => setTransactionDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Amount"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <button onClick={handleAddTransaction}>Add Transaction</button>
        </div>
        <h2>Transaction List</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              <strong>{transaction.description}</strong>: ${transaction.amount.toFixed(2)} ({transaction.date})
            </li>
          ))}
        </ul>
        <button onClick={toDash}>Dashboard</button>
      </div>
    );
  }
  
  export default TransactionHistory;