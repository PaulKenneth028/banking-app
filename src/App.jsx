// import Header from "./components/Header"
import Register from "./components/Registration"
import { useEffect, useState } from "react"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Transfer from "./components/Transfer"
import LinkedCards from "./components/LinkedCards"
import Transaction from './components/Transaction'
import TransactionHistory from "./components/TransactionHistory"

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
    
    const [currentPage, setCurrentPage] = useState ('signin')
    const [user, setUser] = useState(null)
    // const [transactionHistory, setTransactionHistory] = useState([])

        return (
      <>
      <div>
      <Navbar />
        <main>
        {currentPage === 'signin' && <Login setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'dashboard' && <Dashboard user={user} setCurrentPage={setCurrentPage}/>}
          {currentPage === 'Register' && <Register setCurrentPage={setCurrentPage}/>}
          {currentPage === 'transaction' && <Transaction user={user} setUser={setUser} setCurrentPage={setCurrentPage} />}
          {currentPage === 'transfer' && <Transfer user={user} setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'linkedcards' && <LinkedCards user={user} setCurrentPage={setCurrentPage} />}
          {currentPage === "history" && <TransactionHistory user={user} setUser={setUser} setCurrentPage={setCurrentPage} />}
        </main>
      </div>
      <div className="border-line"></div>
      <footer className="flex justify-center" style={{marginTop: '20px'}}>Copyright 2023</footer></>   
  )
}

export default App