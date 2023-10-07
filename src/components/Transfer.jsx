import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Swal from "sweetalert2";

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
    const receiverAccount = storedAccounts.find((account) => account.accountNumber === receiverUsername)
    
    if (!receiverAccount) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Receiver account not found.',
        footer: 'Kiss mo TEWP ko'
      })
      return;
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

      localStorage.setItem('accounts', JSON.stringify(storedAccounts))
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

  const dashboardBtn = () => {
    setCurrentPage('dashboard')
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className='flex justify-center items-center'>
      <form>
        <div>
          <h1>Current Balance:{user.currentBalance}</h1>
          <label>Receiver Account:</label>
          <input
            type="text"
            value={receiverUsername}
            onChange={onSetReceiverUsername}
          />
        </div>
        <div>
          <label>Transfer Amount:</label>
          <input
            type="number"
            value={transferAmount}
            onChange={onSetTransferAmount}
          />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button onClick={transferBtn} style={{ backgroundColor: "white", marginTop: '10px' }}>Transfer</button>
          </div>
        </div>
      </form>
      <button onClick={dashboardBtn}>Go to Dashboard</button>
    </div>
  );
};

export default Transfer;
