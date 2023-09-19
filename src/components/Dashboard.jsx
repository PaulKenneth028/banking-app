import './Dashboard.css'


const Dashboard = (props) => {


    const { user } = props
    const {setCurrentPage, setUser} = props

    return ( <>
    <div className="dashboard">
            <h1 className="userName">Welcome {user.Username}!,</h1>
            {/* <div className='menuBtn'>
                <button className='btnDash'><img src="src/components/Images/Dashboard.png" alt="imgLogo" id='dashboardLogo'/>Dashboard</button>
                <button className='btnDash'><img src="src/components/Images/transferIcon.png" alt="imgLogo" id='dashboardLogo'/>Transfer</button>
                <button>Transactions</button>
                <button>Linked Cards</button>
            </div> */}
            <div className="currentBalance">
                <label id='balanceAmount'>P0.00</label>
                <p id='balanceMessage'>Total Balance</p>
            </div>
            <div className='totalSavings'>
                <label id='balanceAmount'>P0.00</label>
                <p className='totalBalanceSavings'>Total Savings</p>
            </div>
           <button className="addMoneyBtn">Add Money</button>
                <p className='transHistory'>Transaction History</p>
        
            <button className="sendMoney">Send Money</button>
            <button className="addCard">Add Card</button>

        


    
    


    </div>   
    </>
    )
}

export default Dashboard