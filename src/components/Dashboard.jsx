import './Dashboard.css'


const Dashboard = (props) => {


    const { user } = props
    const {setCurrentPage, setUser} = props

    return ( <>
    <div className="dashboard">
            <h1 className="userName">Welcome {user.Username}!,</h1>
            <div className="currentBalance">
                <label>P0.00</label>
                <p>Balance Amount</p>
            </div>
                <button className="addMoneyBtn">Add Money</button>
        
            <button className="sendMoney">Send Money</button>
            <button className="addCard">Add Card</button>
        


    
    


    </div>   
    </>
    )
}

export default Dashboard