import React, { useState, useEffect } from 'react';



const Transaction = (props) => {
    const { user, setCurrentPage, setUser } = props
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('')
    


    const onSetDepositAmount = (e) => setDepositAmount(e.target.value)
    const onSetWithdrawAmount = (e) => setWithdrawAmount(e.target.value)

    const depositBtn = (e) => {
        e.preventDefault()
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
        const accountUpdate = storedAccounts.map((account) => {
            if (account.username === user.username) {
            const depositedAmount = parseFloat(depositAmount)
            account.currentBalance += depositedAmount;
            // if (!isNaN(depositedAmount) && depositedAmount > 0) {
            //     // account.currentBalance += depositedAmount;
            //   }
            }
            return account;
            })
            
        localStorage.setItem('accounts', JSON.stringify(accountUpdate))
        setUser(user)
        setDepositAmount('');
        alert(`Deposit Successful Current balance: P${user.currentBalance}`)
    }

    const withdrawBtn = (e) => {
      e.preventDefault()
      const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
      const accountUpdate = storedAccounts.map((account) => {
          if (account.username === user.username) {
          const withdrawedAmount = parseFloat(withdrawAmount)
          if (!isNaN(withdrawedAmount) && withdrawedAmount > 0) {
            account.currentBalance -= withdrawedAmount;
            alert(`Withdraw Successful Current balance: P${user.currentBalance}`)
          } else if (withdrawedAmount <= user.currentBalance){
            alert('Insufficient funds')
          }}
          return account;
          })
         
      localStorage.setItem('accounts', JSON.stringify(accountUpdate))
      setUser(user)
      setDepositAmount('');

  }




  const toDash = () => {
    setCurrentPage('dashboard')
  }

  return (
    <div style={{display:'flex', flexDirection:'column'}} className='flex justify-center items-center'>
        <form type="submit" onSubmit={depositBtn}>
            <p>P{user.currentBalance}</p>
            <input type="number" placeholder="Enter Amount" value={depositAmount} onChange={onSetDepositAmount}/>
            <button>Deposit</button>
      </form>

      <form type="submit" onSubmit={withdrawBtn} className=''>
            <input type="number" placeholder="Enter Amount" value={withdrawAmount} onChange={onSetWithdrawAmount}/>
            <button>Withdraw</button>
      </form>
      <button onClick={toDash}>Dashboard</button>
    </div>
  );
  }
    

export default Transaction;