import { useEffect, useState } from "react"
import Input from "./InputLogin"
import { useNavigate } from "react-router-dom"

const Register = (props) => {

    const {setCurrentPage, setUser} = props
    const [username, setNameUser] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setyourPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
    const [errorUser, setErrorUser] = useState ('')

    const onSetNameUser = (e) => setNameUser(e.target.value)
    const onSetEmailAddress = (e) => setEmailAddress (e.target.value)
    const onSetYourPassword = (e) => setyourPassword (e.target.value)
    const onSetConfirmPassword = (e) => setConfirmPassword (e.target.value)

    useEffect (() => {
        const accountsCreated = [{
            username, 
            emailAddress, 
            password, 
            confirmPassword
        }]
        localStorage.setItem('newAccounts', JSON.stringify(accountsCreated))
    }, [username, 
        emailAddress, 
        password, 
        confirmPassword])

    const onSubmit = (e) => {
    e.preventDefault()
    
    const newAccount = JSON.parse(localStorage.getItem('newAccounts'))

    
    if (newAccount === newAccount) {
        setErrorUser('Username has already been taken')
        console.log ('Username has already been taken')
     }
    else if (newAccount !== newAccount) {
        console.log('Thank you')
    }

     if(password == confirmPassword) {
        setCurrentPage('signin')
        
     }
     else if (password !== confirmPassword) {
        setErrorConfirmPassword('Password do not match')
        console.log('Password do not match')
     }
    } 


 

    const onClick = () => {
        setCurrentPage('signin')   
    }

    return ( 
        <><div className="flex justify-center items-center mt-[100px]">
            <form onSubmit={onSubmit} className="flex justify-center flex-col items-center w-[500px] border-2">

                <Input
                    label='Username'
                    type='text'
                    value={username}
                    autocomplete='off'
                    onChange={onSetNameUser}
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

                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="flex justify-center mt-10"><button onClick={onClick} style={{fontFamily: 'cursive'}}> Do you have an account? Login here!</button></div></>
    ) 
}

export default Register