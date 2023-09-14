import Header from "./components/Header"
import Register from "./components/Registration"
import { useEffect, useState } from "react"
import Login from "./components/login-forms"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"


function App() {
    useEffect(() => {
      const accounts = [
        {
          Username: 'Kenski28',
          Password: '062813',
        }
      ]

      localStorage.setItem('accounts', JSON.stringify(accounts))
    }, [])

    const [currentPage, setCurrentPage] = useState ('signin')
    const [user, setUser] = useState (null)

    return (
      <>
      <div className="bg-brown-500">
      <Navbar />
        <Header />
        <main>
          
          {currentPage === 'signin' && <Login setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'dashboard' && <Dashboard user={user}/>}
        </main>
      </div>
      <div className="border-line"></div>
      <footer className="flex justify-center" style={{marginTop: '20px'}}>Copyright 2023</footer></>   
  )
}

export default App
