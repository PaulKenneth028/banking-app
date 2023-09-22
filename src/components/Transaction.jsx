import React, { useState, useEffect } from 'react';



const Transaction = (props) => {
    const { user, setCurrentPage } = props
    const [depositAmount, setDepositAmount] = useState('');


    const onSetDepositAmount = (e) => setDepositAmount(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault()
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
        const accountUpdate = storedAccounts.map((account) => {
            if (account.email === user.email) {
            const depositedAmount = parseFloat(depositAmount)
            if (!isNaN(depositedAmount) && depositedAmount > 0) {
                account.currentBalance += depositedAmount;
              }
            }
            return account;
            })
            
        localStorage.setItem('accounts', JSON.stringify(accountUpdate))
        setDepositAmount('');
        alert('Deposit Successful')
    }

  const toDash = () => {
    setCurrentPage('dashboard')
  }

  return (
    <div>
        <form type="submit" onSubmit={onSubmit}>
            <p>P{user.currentBalance}</p>
            <input type="text" placeholder="Enter Amount" value={depositAmount} onChange={onSetDepositAmount}/>
            <button>Deposit</button>
      </form>
      <button onClick={toDash}>Dashboard</button>
    </div>
  );
  }
    

export default Transaction;