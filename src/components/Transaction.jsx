import React, { useState, useEffect } from 'react';
import TransactionHistory from './TransactionHistory';
import Input from './InputLogin';



const Transaction = (props) => {
    const { user, setCurrentPage, setUser} = props
    const [depositAmount, setDepositAmount] = useState('')
    const [withdrawAmount, setWithdrawAmount] = useState('')

    


    const onSetDepositAmount = (e) => setDepositAmount(e.target.value)
    const onSetWithdrawAmount = (e) => setWithdrawAmount(e.target.value)

    const depositBtn = (e) => {
        e.preventDefault()
        let newAccountsDetails = {}
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
        const accountUpdate = storedAccounts.map((account) => {
          if (account.username === user.username) {
            const depositedAmount = parseFloat(depositAmount)
            if (!isNaN(depositedAmount) && depositedAmount >= 0)
            account.currentBalance += depositedAmount;
            
            
            const newTransaction = {
              type: 'Deposit',
              amount: depositedAmount,
              date: new Date().toLocaleString(),
            }
            account.transactionHistory.push(newTransaction)
            newAccountsDetails = {...account, transactionHistory:[...account.transactionHistory]}
            console.log('new account details', newAccountsDetails)
            
            }
            return account;
            })

        localStorage.setItem('accounts', JSON.stringify(accountUpdate))
        setUser(newAccountsDetails)
        setDepositAmount('')
        alert(`Deposit Successful Current balance: P${newAccountsDetails.currentBalance}`)
      }

      const withdrawBtn = (e) => {
        e.preventDefault();
      
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || []
        let newAccountsDetails = {}
        
          storedAccounts.map((account) => {
          if (account.username === user.username) {
            const withdrawedAmount = parseFloat(withdrawAmount)
            if (!isNaN(withdrawedAmount) && withdrawedAmount >= 0) {
              if (account.currentBalance >= withdrawedAmount) {
                account.currentBalance -= withdrawedAmount;



                const newTransaction = {
                  type: 'Withdrawal',
                  amount: withdrawedAmount,
                  date: new Date().toLocaleString(),
                }
                account.transactionHistory.push(newTransaction)
                
                newAccountsDetails = { ...account, transactionHistory: [...account.transactionHistory]}

                localStorage.setItem('accounts', JSON.stringify(storedAccounts))
                setUser(newAccountsDetails)
                setWithdrawAmount('')
                alert(`Withdraw Successful. Current balance: P${newAccountsDetails.currentBalance}`)
              } else {
                alert('Insufficient funds');
              }
            } else {
              alert('Invalid withdrawal amount');
            }
          }
          return account;
        })
      }
      

  const toDash = () => {
    setCurrentPage('dashboard')
  }

  return (
    <div style={{display:'flex', flexDirection:'column'}} className='flex justify-center items-center'>
        <form type="submit" onSubmit={depositBtn}>
            <p>P{user.currentBalance}</p>
            <Input type='number' placeholder="Enter Amount" value={depositAmount} onChange={onSetDepositAmount}/>
            <button>Deposit</button>
      </form>

      <form type="submit" onSubmit={withdrawBtn} className=''>
            <Input type='number' placeholder="Enter Amount" value={withdrawAmount} onChange={onSetWithdrawAmount}/>
            <button>Withdraw</button>
      </form>
      <button onClick={toDash}>Dashboard</button>
    </div>
  );
  }
    

export default Transaction