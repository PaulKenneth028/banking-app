import { useEffect, useState } from "react"
import Input from "./InputLogin"
import { useNavigate } from "react-router-dom"
import './Registration.css'

const Register = (props) => {

    const { setCurrentPage } = props

    const [username, setNameUser] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setyourPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountNumber, setAccountNumber] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorUser, setErrorUser] = useState('')
    const [currentBalance, setCurrentBalance] = useState(5000)
    const [totalSavings, setTotalSavings] = useState(1000)
    

    const onSetNameUser = (e) => setNameUser(e.target.value)
    const onSetAccountNumber = (e) => setAccountNumber(e.target.value)
    const onSetEmailAddress = (e) => setEmailAddress (e.target.value)
    const onSetYourPassword = (e) => setyourPassword (e.target.value)
    const onSetConfirmPassword = (e) => setConfirmPassword (e.target.value)

    const onSubmit = (e) => {
    e.preventDefault()

    let existingAccounts = JSON.parse(localStorage.getItem('accounts'))
    let account = existingAccounts.find((item) => {
        return item.username === username && item.emailAddress && item.accountNumber
        
    })
    
    if (account) {
        setErrorUser('Username has already been taken')
    } else if(password === confirmPassword) {
        let newAccount = {
            username,
            password,
            emailAddress,
            accountNumber,
            currentBalance,
            totalSavings,
        }
        localStorage.setItem('accounts', JSON.stringify([
            ...existingAccounts, 
            newAccount,
        ]))
        setCurrentPage('signin')
     }
     else if (password !== confirmPassword) {
        setErrorConfirmPassword('Password and confirm password do not match')
     }
    } 

    const onClick = () => {
        setCurrentPage('signin')   
    }

    return ( 
        <>
        <div className="flex justify-center items-center mt-[100px]">
            <form onSubmit={onSubmit} className="flex justify-center flex-col items-center w-[500px] border-2">

                <Input
                    label='Username'
                    type='text'
                    value={username}
                    autocomplete='off'
                    onChange={onSetNameUser}
                    required 
                    /> 
           {errorUser && <small>{errorUser}</small>}
                <Input
                    className="accountNumber"
                    label='Account Number'
                    type='number'
                    value={accountNumber}
                    onChange={onSetAccountNumber}
                    required 
                    /> 
                        
                <Input
                    label='Email Address'
                    type='Email'
                    value={emailAddress}
                    onChange={onSetEmailAddress} 
                    />

                <Input
                    label='Password'
                    type='password'
                    value={password}
                    onChange={onSetYourPassword}
                    required
                    />
                    

                <Input
                    label='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={onSetConfirmPassword} 
                    required
                    />
                {errorConfirmPassword && <small>{errorConfirmPassword}</small>}
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="flex justify-center mt-10"><button onClick={onClick} style={{fontFamily: 'cursive'}}> Do you have an account? Login here!</button></div></>
    ) 
}

export default Register