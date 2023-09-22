import React from "react";
import Dashboard from "./Dashboard";
import { useState } from "react";


const Transfer = (props) => {
    const {user, setCurrentPage} = props
    const storedAccounts = JSON.parse(localStorage.getItem('accounts'))
    const [sendMoney, setSendMoney] = useState({
        amount:"",
        password:""
    })
    const [errorSending, setErrorSending] = useState({})

    const onSetSendMoney = (e) => setSendMoney (e.target.value)

    const errorValidation = (e) => {
        e.preventDefault()
        const checkBalance = user.balance < sendMoney.amount
        const accountValidation = storedAccounts.find((account) => account.username === sendMoney.username)
        const moneyValidationError = {}

        if (!checkBalance) {
            moneyValidationError.amount = 'Insufficient Funds'
        }
        if(!sendMoney.amount){
            moneyValidationError.noamount = 'Please enter valid amount'
        }
        if(!accountValidation) {
            moneyValidationError.username = 'Account number provided does not match'
        }
    }

    const dashboardBtn = (() => {
        setCurrentPage('dashboard')
    })
    return ( <div>
            <form type="submit" onSubmit={errorValidation}>
            <p>P{user.currentBalance}</p>
            <input type="text" placeholder="Enter Amount" onChange={onSetSendMoney}/>
            <button>Transfer</button>
      </form>
        <button onClick={dashboardBtn}>Dashboard</button>
        </div>
    )
}

export default Transfer