import React from "react";

const TransactionHistory = (props) => {
  const { user, setCurrentPage } = props
    const toDash = () => {
      setCurrentPage('dashboard')
    }
  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {user.transactionHistory.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>P{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div onClick={toDash}>toDash</div>
    </div>
  );
};

export default TransactionHistory;
