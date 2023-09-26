import React, { useState, useEffect } from 'react';
import TransactionHistory from './TransactionHistory';



const Transaction = (props) => {
    const { user, setCurrentPage, setUser, transactionHistory, setTransactionHistory} = props
    console.log(transactionHistory)
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
            if (depositedAmount > 0)
            account.currentBalance += depositedAmount;
            
            
            const newTransaction = {
              type: 'Deposit',
              amount: depositedAmount,
              date: new Date().toLocaleString(),
            }
            console.log(newTransaction)
            setTransactionHistory([...transactionHistory, newTransaction]);
            }


            return account;
            })
            
        localStorage.setItem('accounts', JSON.stringify(accountUpdate))
        setUser(storedAccounts.find((account) => {
          if (account.username === user.username) {
            return true
          } else {
            return false
          }
        }))
        setDepositAmount('');
        alert(`Deposit Successful Current balance: P${user.currentBalance}`)
    }

    const withdrawBtn = (e) => {
      e.preventDefault()
      const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
      const accountUpdate = storedAccounts.map((account) => {
          if (account.username === user.username) {
          const withdrawedAmount = parseFloat(withdrawAmount)
          if (withdrawedAmount > 0) {
            account.currentBalance -= withdrawedAmount;

            const newTransaction = {
              type: 'Withdrawal',
              amount: withdrawedAmount,
              date: new Date().toLocaleString(),
            };
            setTransactionHistory([...transactionHistory, newTransaction]);

            alert(`Withdraw Successful Current balance: P${user.currentBalance}`)
          } else if (withdrawedAmount <= user.currentBalance){
            alert('Insufficient funds')
          }}
          return account;
          })
         
      localStorage.setItem('accounts', JSON.stringify(accountUpdate))
      setUser((storedAccounts.find((account) => {
        if (account.username === user.username) {
          return true
        } else {
          return false
        }
      })))
      setWithdrawAmount('');
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