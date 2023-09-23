import React from "react";
import Dashboard from "./Dashboard";
import { useState } from "react";


const Transfer = (props) => {
    const { user, setCurrentPage, setUser } = props;
    const [transferAmount, setTransferAmount] = useState('');
    const [receiverUsername, setReceiverUsername] = useState('');

    const onSetTransferAmount = (e) => setTransferAmount(e.target.value);
    const onSetReceiverUsername = (e) => setReceiverUsername(e.target.value);


    const transferBtn = (e) => {
        e.preventDefault();
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const senderAccount = storedAccounts.find(account => account.accountNumber === user.accountNumber);
        const receiverAccount = storedAccounts.find(account => account.accountNumber === receiverUsername);
    
        if (!receiverAccount) {
          alert('Receiver account not found.');
          return;
        }
    
        const amountToTransfer = parseFloat(transferAmount);
    
        if (!isNaN(amountToTransfer) && amountToTransfer > 0 && senderAccount.currentBalance >= amountToTransfer) {
          senderAccount.currentBalance -= amountToTransfer;
          receiverAccount.currentBalance += amountToTransfer;
    
          localStorage.setItem('accounts', JSON.stringify(storedAccounts));
          setUser(user);
          setTransferAmount('');
          setReceiverUsername('');
          alert(`Transfer Successful. Current balance: P${user.currentBalance}`);
        } else {
          alert('Invalid transfer amount or insufficient funds.');
        }
      };

    const dashboardBtn = () => {
    setCurrentPage('dashboard');
  }

return (
    <div style={{display:'flex', flexDirection:'column'}} className='flex justify-center items-center'>
        <form action="">
        <div>
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
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <button onClick={transferBtn} style={{backgroundColor: "white", marginTop: '10px'}}>Transfer</button>
        </div>
      </div>
      </form>
      <button onClick={dashboardBtn}>Go to Dashboard</button>
    </div>
    
  );
}

export default Transfer;