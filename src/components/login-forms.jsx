import { useState } from "react"
import Input from "./InputLogin"
import { useNavigate } from "react-router-dom"




const Login = (props) => {
     const {setCurrentPage, setUser} = props
     const [Username, setUsername] = useState ('')
     const [userError, setUserError] = useState ('')
     const [Password, setPassword] = useState ('')
     const [passError, setPassError] = useState ('')

     const onUsernameChange = (e) => setUsername(e.target.value)
     const onPasswordChange = (e) => setPassword (e.target.value)
     
     const onSubmit = (e) => {
        e.preventDefault()
        setPassError('')
        setUserError('')

     const accounts = JSON.parse(localStorage.getItem('accounts'))
     

     
     const accountSelected = accounts.find(names => Username === names.Username)
     if (!accountSelected) {
        setUserError ('Username not found')
        return
     }

     if (accountSelected?.Password !== Password) {
        setPassError ('Username and Password does not match')
        return
     }

     if (accountSelected.Password === Password) {
        setUser(accountSelected)
        setCurrentPage('dashboard')
        setUserError('')
        setPassError('')
        return
     }
    }
    
    const onClick = () => {
      setUser('')
      setCurrentPage('Register')
    }

    return (
        
     <section className="flex flex-col justify-center items-center">
        <form onSubmit={onSubmit} className="flex flex-col justify-center border-2 p-5 w-[20%] ">
            <Input
                label='Username'
                type='text'
                value={Username}
                onChange={onUsernameChange}
                required
            />
            {userError && (<small>{userError}</small>)}
            <Input
                
                label='Password'
                type='password'
                value={Password}
                onChange={onPasswordChange}
                required
            />
            {passError && (<small >{passError}</small>)}
            <button id="button1" type="submit" style={{backgroundColor: "white", 
            marginTop: "10px", width: "50px", fontSize: "13px", borderRadius: "50%"}}>Sign-in</button>
        </form>
            <button onClick={onClick}> No account yet? Signup here!</button>
     </section>
    )
}

export default Login