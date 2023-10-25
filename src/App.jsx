// import Header from "./components/Header"
import Register from "./components/Registration"
import { useEffect, useState } from "react"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
// import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Transfer from "./components/Transfer"
import Transaction from './components/Transaction'
import BudgetTracker from "./components/BudgetTracker"
import TransactionHistory from "./components/TransactionHistory"
import Home from "./components/Home"


function App() {

  
    // useEffect(() => {
    //   const accounts = [
    //     {
    //       Username: 'Kenski28',
    //       Password: '062823',
    //       emailAddress: 'kennethremigio@yahoo.com',
    //       currentBalance: 1000,
    //       totalSavings: 1000,
    //       accountNumber:'123456'
    //     }
    //   ]

    //   localStorage.setItem('accounts', JSON.stringify(accounts))
    // }, [])
    
    const [currentPage, setCurrentPage] = useState ('Home')
    const [user, setUser] = useState(null)
    const [expense, setexpense] = useState([])
        return (
      <>
      <div>
        <main>
          {currentPage === 'Home' && <Home setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'signin' && <Login setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'dashboard' && <Dashboard user={user} setCurrentPage={setCurrentPage}/>}
          {currentPage === 'Register' && <Register setCurrentPage={setCurrentPage}/>}
          {currentPage === 'transaction' && <Transaction user={user} setUser={setUser} setCurrentPage={setCurrentPage} />}
          {currentPage === 'transfer' && <Transfer user={user} setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'budgetTracker' && <BudgetTracker user={user} setUser={setUser} setCurrentPage={setCurrentPage}/>}
          {currentPage === "history" && <TransactionHistory user={user} setUser={setUser} setCurrentPage={setCurrentPage} />}
        </main>
      </div>
      <div className="border-line"></div>
      </>   
  )
}

export default App