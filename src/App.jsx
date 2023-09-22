// import Header from "./components/Header"
import Register from "./components/Registration"
import { useEffect, useState } from "react"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Transfer from "./components/Transfer"
import LinkedCards from "./components/LinkedCards"
import Transaction from "./components/Transaction"

function App() {

  
    // useEffect(() => {
    //   const accounts = [
    //     {
    //       Username: 'Kenski28',
    //       Password: '062823',
    //     }
    //   ]

    //   localStorage.setItem('accounts', JSON.stringify(accounts))
    // }, [])
    
    const [currentPage, setCurrentPage] = useState ('signin')
    const [user, setUser] = useState(null)

        return (
      <>
      <div>
      <Navbar />
        <main>
        {currentPage === 'signin' && <Login setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'dashboard' && <Dashboard user={user} setCurrentPage={setCurrentPage}/>}
          {currentPage === 'Register' && <Register setCurrentPage={setCurrentPage}/>}
          {currentPage === 'transaction' && <Transaction user={user} setCurrentPage={setCurrentPage}/>}
          {currentPage === 'transfer' && <Transfer user={user} setCurrentPage={setCurrentPage}/>}
          {currentPage === 'linkedcards' && <LinkedCards user={user} setCurrentPage={setCurrentPage}/>}
        </main>
      </div>
      <div className="border-line"></div>
      <footer className="flex justify-center" style={{marginTop: '20px'}}>Copyright 2023</footer></>   
  )
}


  //   if (currentPage === 'signin') {
  //     return (
  //     <>
  //     <Login setCurrentPage={setCurrentPage} setUser={setUser}/>
  //     </>
  //   )
  // }

  //   if (currentPage === 'dashboard') {
  //     return (
  //       <>
  //     <Dashboard user={user} />
  //     </>
  //   )
  // }

  //   if (currentPage === registration) {
  //     return (
  //       <>
  //       <Register setRegistrationPage={setRegistrationPage}/> 
  //       </>
  //     )
  //   }
  // }



//     return (
//       <>
//       <div>
//       {/* <Navbar /> */}
//         <Header />
//         <main>
//           <BrowserRouter>
//           <Routes>
//               <Route path="/Login" element={<Login setCurrentPage={setCurrentPage} setUser={setUser} />} />
//               <Route path="/Registration" element={<Register />} />
//           </Routes>
//           </BrowserRouter>
//         </main>
//       </div>
//       <div className="border-line"></div>
//       <footer className="flex justify-center" style={{marginTop: '20px'}}>Copyright 2023</footer></>   
//   )
// }


export default App


  {/* {currentPage === 'signin' && <Login setCurrentPage={setCurrentPage} setUser={setUser} />}
          {currentPage === 'dashboard' && <Dashboard user={user}/>}
          {currentPage === 'register' && <Register registration={registration}/>} */}