import React, { useState, useEffect } from 'react';
import TransactionHistory from './TransactionHistory';
import Input from './InputLogin';
import Swal from 'sweetalert2';
import "./Transaction.css"
import Headers from './Header';



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
            }
            return account;
            })

        localStorage.setItem('accounts', JSON.stringify(accountUpdate))
        setUser(newAccountsDetails)
        setDepositAmount('')
        Swal.fire({
          title: `Deposit Successful. Current balance: P${newAccountsDetails.currentBalance}`,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
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
                Swal.fire(
                  `Withdraw Successful. Current balance: P${newAccountsDetails.currentBalance}`
                )
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Insufficient funds',
                  footer: 'Check your balance'
                })
              }
            } 
          }
          return account;
        })
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

const transferBtn = (() => {
    setCurrentPage('transfer')
})

const BudgetTracker = (() => {
    setCurrentPage('budgetTracker')
    let budgetTrack = JSON.parse(localStorage.getItem("accounts"))
    console.log(budgetTrack)
}) 


  return (
    <><Headers />
    <div className='bodyTransaction'>
      <p className='userBalance'>My Current Balance: P{user.currentBalance}</p>
      <form type="submit" onSubmit={depositBtn} className='depositForm'>
        <Input type='number' placeholder="Enter Amount" value={depositAmount} onChange={onSetDepositAmount} />
        <button className='depositBtn'>Deposit</button>
      </form>

      <form type="submit" onSubmit={withdrawBtn} className='withdrawForm'>
        <Input type='number' placeholder="Enter Amount" value={withdrawAmount} onChange={onSetWithdrawAmount} />
        <button className='withdrawBtn'>Withdraw</button>
      </form>
      <div className='sideBarBtn'>
        <button className="btn" onClick={toDash}>Dashboard</button>
        <button className="btn" onClick={transferBtn}> Transfer</button>
        <button className="btn" onClick={transactionbtn}>Transactions</button>
        <button className="btn" onClick={BudgetTracker}>Budget Tracker</button>
        <button className="btn" onClick={historyBtn}>Transaction History</button>
      </div>
    </div></>
  );
  }
    

export default Transaction