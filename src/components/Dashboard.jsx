import './Dashboard.css'
import { useEffect, useState } from "react"


const Dashboard = (props) => {

    const { user } = props
    const {setCurrentPage, setUser} = props
    const [count, setCount] = useState(0.00)
  
    const [modal, setModal] = useState(false)

    const onClick = () => {
        setCurrentPage('signin')  
    }

    const addMoney = () => {

    }

    const storedAccounts = JSON.parse (localStorage.getItem('accounts'))
    const accountUpdated = storedAccounts.map((account) => {
        if (account.email === user.email){
            account.balance += 1000
        }
        return account
    })

    localStorage.setItem('accounts', JSON.stringify(accountUpdated))

    return ( <>
    <div className="dashboard">
            <h1 className="userName">Welcome {user.Username}!,</h1>
            <div className="currentBalance">
                <label id='balanceAmount'>P{count}</label>
                <p id='balanceMessage'>Total Balance</p>

            </div>
            <div className='totalSavings'>
                <label id='balanceAmount'>P0.00</label>
                <p className='totalBalanceSavings'>Total Savings</p>
            </div>
           <button className="addMoneyBtn" onClick={addMoney}>Add Money</button>
                <p className='transHistory'>Transaction History</p>
        
            <button className="sendMoney">Send Money</button>
            <button className="addCard">Add Card</button>
            <div className='menuBtn'>
                <button className='btnDash'> <img src="src/components/Images/Dashboard.png" alt="Image logo" 
                style={{width:'30px', display:'flex', alignItems:'center'}}/> Dashboard</button>

                <button className='btntransfer' style={{display:'flex', alignItems:'center', width: '120%', marginBottom: '30px'}}> 
                <img src="src/components/Images/transferIcon.png" alt="Image logo" style={{width:'50px', display:'flex', alignItems:'center'}}/> Transfer</button>

                <button style={{ display:'flex', alignItems:'center', width: '120%', marginBottom: '30px'}}> 
                <img src="src/components/Images/transaction.png" alt="Image logo" style={{width:'50px', display:'flex', alignItems:'center'}}/>Transactions</button>
                
                <button style={{ display:'flex', alignItems:'center', width: '120%', marginBottom: '30px'}}>
                <img src="src/components/Images/—Pngtree—bank card_1241597(1).png" alt="Image logo" style={{width:'50px', display:'flex', alignItems:'center'}}/>Linked Cards</button>

                <button onClick={onClick}>Logout</button> 
                
            </div>
    
    


    </div>   
    </>
    )
}

export default Dashboard