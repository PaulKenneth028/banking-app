import { useState, useEffect } from "react"
import Input from "./InputLogin"
import { redirect, useNavigate } from "react-router-dom"
import './login.css'
import Headers from "./Header"


const Login = (props) => {

    const { setCurrentPage, setUser } = props
     const [loginUser, setLoginUser] = useState({
        username:'',
        password:'',
        accountNumber:'',
     })
     
     const [userError, setErrorUser] = useState('')
     const [passError, setPassError] = useState ('')
     const [isLocked, setIsLocked] = useState(false);
     const [message, setMessage] = useState('');
     const [loginAttempts, setLoginAttempts] = useState(0);

     const onChange = (e) => {
        const { name, value } = e.target;
        setLoginUser({
            ...loginUser,
            [name]: value,
        })
       }
     
     const onSubmit = (e) => {
        e.preventDefault()

        if (isLocked) {
            setMessage('Account locked. Try again later.');
            return;
          }
      
        const accounts = JSON.parse(localStorage.getItem('accounts')) || []
        const account = accounts.find((account) => {
            return account.username === loginUser.username 
        })
        if (!account) {
           return
        }
        
        if (account.password !== loginUser.password) {
            setLoginAttempts(loginAttempts + 1)
            setPassError ('Username and Password does not match')
            // setPassError('')
            return
        }

        if (loginAttempts >= 2) {
            setIsLocked(true);
            setMessage('Account locked. Try again later.');

            setTimeout(() => {
                setIsLocked(false);
                setMessage('');
                setLoginAttempts(0);
              }, 60000); 
              return
            } 
        // if ( account.username === loginUser.username && account.password === loginUser.password) {
        //     setUser(account)
        //     setCurrentPage('dashboard')
        // }
        setErrorUser('');
        setPassError('');
        setUser(account)
        setCurrentPage('dashboard')
        }

    
        useEffect(() => {
        
            setErrorUser('');
            setPassError('');
          }, []);
  
    const onClick = () => {
      setCurrentPage('Register')
    }

    return (
        
        <><Headers />
        <section className="loginForm">
            <form onSubmit={onSubmit} className="form1">
                <label>Username:</label>
                <input
                    className="loginInfo"
                    type="username"
                    name='username'
                    value={loginUser.username}
                    onChange={onChange} />
                <label>Password:</label>
                <input
                    className="loginInfo"
                    type="password"
                    name='password'
                    value={loginUser.password}
                    onChange={onChange}
                    required />
                {passError && (<small>{passError}</small>)}
                <button id="button1" type="submit">Sign-in</button>
                {message && <p>{message}</p>}
                <button onClick={onClick} className="signUpButton"> No account yet? Signup here!</button>
            </form>
        </section>
        <div style={{height: '200px'}}>   
        </div>
        <footer className="flex justify-center" style={{marginTop: '20px'}}>Copyright 2023</footer></>
    )
}

export default Login