import React, { useState } from "react"; // Import useState from React
import Dashboard from "./Dashboard";

const Transfer = (props) => {
  const { user, setCurrentPage, setUser } = props; // Remove unnecessary props
  const [transferAmount, setTransferAmount] = useState('');
  const [receiverUsername, setReceiverUsername] = useState('');

  const onSetTransferAmount = (e) => setTransferAmount(e.target.value);
  const onSetReceiverUsername = (e) => setReceiverUsername(e.target.value);

  const transferBtn = (e) => {
    e.preventDefault();
    let newAccountsDetails = {};
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const senderAccount = storedAccounts.find((account) => account.accountNumber === user.accountNumber); 
    const receiverAccount = storedAccounts.find((account) => account.accountNumber === receiverUsername);
    
    if (!receiverAccount) {
      alert('Receiver account not found.');
      return;
    }

    const amountToTransfer = parseFloat(transferAmount);

    if (!isNaN(amountToTransfer) && amountToTransfer > 0 && senderAccount.currentBalance >= amountToTransfer) {
      senderAccount.currentBalance -= amountToTransfer;
      receiverAccount.currentBalance += amountToTransfer;

      const newTransaction = {
        type: 'Transfer', 
        amount: amountToTransfer, 
        date: new Date().toLocaleString(),
      };

    
      senderAccount.transactionHistory.push(newTransaction);
      receiverAccount.transactionHistory.push(newTransaction);

      newAccountsDetails = { ...senderAccount, transactionHistory: [...senderAccount.transactionHistory, newTransaction] };

      localStorage.setItem('accounts', JSON.stringify(storedAccounts));
      setUser(newAccountsDetails);
      setTransferAmount('');
      setReceiverUsername('');
      alert(`Transfer Successful. Current balance: P${senderAccount.currentBalance}`);
    } else {
      alert('Invalid transfer amount or insufficient funds.');
    }
  };

  const dashboardBtn = () => {
    setCurrentPage('dashboard');
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
