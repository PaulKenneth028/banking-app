import React from "react";
import './transactionHistory.css'

const TransactionHistory = (props) => {
  const { user, setCurrentPage } = props
    
  
  const toDash = () => {
      setCurrentPage('dashboard')
    }

  return (
    <div>
      <h1 className="transactionHeader">Transaction History</h1>
      <table>
      <div className="tableHead"> 
        <thead>
          <tr>
          <div className="tableheader">
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </div>
          </tr>
        </thead>
        </div>
        <tbody>
          {user.transactionHistory.map((transaction, index) => (
            <tr key={index}>
              <div className="tableHead"> 
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>P{transaction.amount}</td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <div onClick={toDash} style={{display:"flex", justifyContent: "center"}}>Dashboard</div>
    </div>
  )
}

export default TransactionHistory;
