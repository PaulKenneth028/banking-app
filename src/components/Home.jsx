import React from 'react'
// import Navbar from './Navbar'
import "./Home.css"

const Home = (props) => {
    const {setCurrentPage, user} = props
    
    const logInBtn = (e) => {
        e.preventDefault()
        setCurrentPage('signin')
    }
    
    const signUpBtn = () => {
        setCurrentPage('Register')
    }

    return (
    <>
    <section className='homeUI'>
    <div className="navContainer">
        <div>
            <img src="src/components/Images/background-logo.png" alt="banklogo" id='homeLogo' />
        </div>
        <div className='navBar'>
            <button>About</button>
            <button>Contact</button>
            <button>Updates</button>   
        </div>
         <div> 
            <button id='loginBtn' onClick={logInBtn}>Login</button>
            <button id='signUpBtn' onClick={signUpBtn}>Signup</button>
        </div>   
    </div>
    <section className='bankappfeatures'>
    <div className='bankappfeat'>
    <h1 className='bankapphead' style={{fontSize:'50px', marginRight: '200px'}}>Next Generation Bank Application</h1>
    <ul >
        <li className='features'>User-Friendly Interface: Ensure an intuitive and easy-to-navigate design for users of all ages and tech-savviness.</li>
        <li className='features'>Account Overview: Provide a clear and concise summary of account balances, recent transactions, and credit limits on the main dashboard.</li>
        <li className='features'>Online Check Deposit: Allow users to deposit checks by simply taking photos of them with their smartphone.</li>
        <li className='features'>Bill Pay: Enable users to pay bills directly from the app, set up recurring payments, and receive reminders for due dates.</li>
        <li className='features'>Money Transfer: Facilitate seamless money transfers between accounts, to other bank accounts, or even internationally.</li>
        <li className='features'>Budgeting Tools: Offer tools to help users create and manage budgets, track expenses, and set savings goals.</li>
    </ul>
</div>
</section>
    </section>
    </>
 )
}

export default Home
