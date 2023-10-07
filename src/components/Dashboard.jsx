import './Dashboard.css'
import { useEffect, useState } from "react"
import Transaction from './Transaction'
import Transfer from './Transfer'
import BudgetTracker from './BudgetTracker'


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
    }) 

    const logOutBtn = (() => {
        setCurrentPage('signin')
    })

    return ( <>
    <div className="dashboard">
            <h1 className="userName">Welcome {user.username}!
            <br />Account#:{user.accountNumber}</h1>
            <div className="currentBalance">
                <label id='balanceAmount'>P{user.currentBalance.toFixed(2)}</label>
                <p id='balanceMessage'>Total Balance</p>

            </div>
            <div className='totalSavings'>
                <label id='balanceAmount'>P{user.totalSavings.toFixed(2)}</label>
                <p className='totalBalanceSavings'>Total Savings</p>
            </div>
           <button className="addMoneyBtn" onClick={addMoneyBtn} >Add Money</button>
           <button className="withdrawBtn">Withdraw</button>
                <button className='transHistory' onClick={historyBtn}>Transaction History</button>
        
            <button className="sendMoney">Send Money</button>
            <button className="addCard">Add Card</button>
            <div className='menuBtn'>
                <button className="btn" style={{display:'flex', alignItems:'center', width: '120%', marginBottom: '30px'}}> <img src="src/components/Images/Dashboard.png" alt="Image logo" 
                style={{width:'30px', display:'flex', alignItems:'center'}}/> Dashboard</button>

                <button className="btn"  onClick={transferBtn} style={{display:'flex', alignItems:'center', width: '120%', marginBottom: '30px'}}> 
                <img src="src/components/Images/transferIcon.png" alt="Image logo" style={{width:'50px', display:'flex', alignItems:'center'}}/> Transfer</button>

                <button className="btn" onClick={transactionbtn} style={{ display:'flex', alignItems:'center', width: '120%', marginBottom: '30px'}}> 
                <img src="src/components/Images/transaction.png" alt="Image logo" style={{width:'50px', display:'flex', alignItems:'center'}}/>Transactions</button>
                
                <button className="btn" onClick={BudgetTracker}style={{ display:'flex', alignItems:'center', width: '120%', marginBottom: '30px'}}>
                <img src="src/components/Images/—Pngtree—bank card_1241597(1).png" alt="Image logo" style={{width:'50px', display:'flex', alignItems:'center'}}/>Budget Tracker</button>

                <button className="btn" onClick={logOutBtn}>Logout</button> 
                
            </div>
    
    


    </div>   
    </>
    )
}

export default Dashboard