import { useEffect, useState } from "react"
import Input from "./InputLogin"
import { useNavigate } from "react-router-dom"

const Register = (props) => {

    const {setCurrentPage, setUser} = props
    const [username, setNameUser] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setyourPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSetNameUser = (e) => setNameUser(e.target.value)
    const onSetEmailAddress = (e) => setEmailAddress (e.target.value)
    const onSetYourPassword = (e) => setyourPassword (e.target.value)
    const onSetConfirmPassword = (e) => setConfirmPassword (e.target.value) 
    
    const onSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem ('userinfo', JSON.stringify([username, emailAddress, password, confirmPassword]))
        console.log(localStorage)
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
                    onChange={onSetNameUser}
                    required />

                <Input
                    label='Email Address'
                    type='Email'
                    value={emailAddress}
                    onChange={onSetEmailAddress} />

                <Input
                    label='Password'
                    type='password'
                    value={password}
                    onChange={onSetYourPassword} />
                <Input
                    label='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={onSetConfirmPassword} />
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="flex justify-center mt-10"><button onClick={onClick} style={{fontFamily: 'cursive'}}> Do you have an account? Login here!</button></div></>
    ) 
}

export default Register