import React, { useState } from "react";
import "./Transfer.css"
import Swal from "sweetalert2";
import Headers from "./Header";
import TimeandDate from "./Timer";

const Transfer = (props) => {
  const { user, setCurrentPage, setUser } = props; 
  const [transferAmount, setTransferAmount] = useState('')
  const [receiverUsername, setReceiverUsername] = useState('')

  const onSetTransferAmount = (e) => setTransferAmount(e.target.value)
  const onSetReceiverUsername = (e) => setReceiverUsername(e.target.value)

  const transferBtn = (e) => {
    e.preventDefault()
    let newAccountsDetails = {}
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const senderAccount = storedAccounts.find((account) => account.accountNumber === user.accountNumber)
    const receiverAccount = storedAccounts.find((account) => account.accountNumber === receiverUsername);
    
    if (!receiverAccount) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Receiver account not found.',
        footer: 'Check mo naaaaa'
      })
      return;
    }

    if (!receiverAccount.transactionHistory) {
      receiverAccount.transactionHistory = [];
    }

    const amountToTransfer = parseFloat(transferAmount)

    if (!isNaN(amountToTransfer) && amountToTransfer > 0 && senderAccount.currentBalance >= amountToTransfer) {
      senderAccount.currentBalance -= amountToTransfer
      receiverAccount.currentBalance += amountToTransfer

      const newTransaction = {
        type: 'Money transfer', 
        amount: amountToTransfer, 
        date: new Date().toLocaleString(),
      }

      receiverAccount.transactionHistory.push(newTransaction);

      newAccountsDetails = { ...senderAccount, transactionHistory: [...senderAccount.transactionHistory, newTransaction] }
      const updatedAccounts = storedAccounts.map((account) =>
      account.accountNumber === user.accountNumber ? senderAccount : account
    );
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts))
      setUser(newAccountsDetails)
      setTransferAmount('')
      setReceiverUsername('')
      Swal.fire({
        title: `Transfer Successful. Current balance: P${senderAccount.currentBalance}`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid transfer amount or insufficient funds.',
        footer: 'Check what you need to check'
      })
    }
  }

  const toDash = () => {
    setCurrentPage('dashboard')
  }

  const transactionbtn = (() => {
    setCurrentPage('transaction')
})

const historyBtn = (() => {
    setCurrentPage('history')
})

const goToTransfer = (() => {
    setCurrentPage('transfer')
})

const BudgetTracker = (() => {
    setCurrentPage('budgetTracker')
    let budgetTrack = JSON.parse(localStorage.getItem("accounts"))
    console.log(budgetTrack)
}) 

  return (
      <><Headers />
      <TimeandDate/>
      <div className="bodyTransfer">
      <form>
        <div className="receiverAccount">
          <h1 className="userBalance">My Current Balance:{user.currentBalance}</h1>
          <label>Receiver Account:</label>
          <input
            type="text"
            value={receiverUsername}
            onChange={onSetReceiverUsername} 
            />
          <label>Transfer Amount:</label>
          <input
            type="number"
            value={transferAmount}
            onChange={onSetTransferAmount} />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button onClick={transferBtn} style={{ backgroundColor: "white", marginTop: '10px' }}>Transfer</button>
          </div>
        </div>
      </form>
      <div className='sideBarBtn'>
        <button className="btn" onClick={toDash}>Dashboard</button>
        <button className="btn" onClick={goToTransfer}> Transfer</button>
        <button className="btn" onClick={transactionbtn}>Transactions</button>
        <button className="btn" onClick={BudgetTracker}>Budget Tracker</button>
        <button className="btn" onClick={historyBtn}>Transaction History</button>
      </div>
    </div></>
  );
};

export default Transfer;
