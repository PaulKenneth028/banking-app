import './Dashboard.css'
import { useEffect, useState } from "react"
import Transaction from './Transaction'
import Transfer from './Transfer'
import BudgetTracker from './BudgetTracker'
import Headers from './Header'
import TimeandDate from './Timer'


const Dashboard = (props) => {
    const { user, setCurrentPage } = props
    const [ addMoney, setAddMoney] = useState(false)

    // const data = [{
    //     withdraw: '',
    //     transfer:'',
    //     deposit:''
    // }]

    

    const addMoneyBtn = (() => {
    
})

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

    const logOutBtn = (() => {
        setCurrentPage('signin')
    })

    return ( <>
        <Headers/>
        
<section className='flex justify-center'>
    <div className="dashboard">
     <TimeandDate />
            <h1 className="userName">Welcome {user.username}!
            <br /><span className='userAccount'>{user.accountNumber}</span></h1>
            <div className="currentBalance">
                <label id='balanceAmount'>P{user.currentBalance.toFixed(2)}</label>
                <p id='balanceMessage'>Total Balance</p>

            </div>
            <div className='totalSavings'>
                <label id='balanceAmount'>P{user.totalSavings.toFixed(2)}</label>
                <p className='totalBalanceSavings'>Total Savings</p>
            </div>
           <button className="addMoneyBtn" onClick={addMoneyBtn} >Add Money</button>
           <button className="withdrawMoney">Withdraw</button>
                <button className='transHistory' onClick={historyBtn}>Transaction History</button>
        
            <button className="sendMoney">Send Money</button>
            <button className="addCard">Add Card</button>
            <div className='sideBarBtn'>
                <button className="btn">Dashboard</button>
                <button className="btn"  onClick={transferBtn}> Transfer</button>
                <button className="btn" onClick={transactionbtn}>Transactions</button>
                <button className="btn" onClick={BudgetTracker}>Budget Tracker</button>
                <button className="btn" onClick={logOutBtn}>Logout</button> 
                
            </div>
    </div> 
</section>      
    </>
    )
}

export default Dashboard