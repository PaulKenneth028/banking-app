import { useState, useEffect } from "react"
import Input from "./InputLogin"
import { redirect, useNavigate } from "react-router-dom"




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

    //  const onusernameChange = (e) => setLoginUser(e.target.value)
    //  const onpasswordChange = (e) => setLoginUser (e.target.value)

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
           setErrorUser ('Username does not exist')
           return
        }
        
        if (account.password !== loginUser.password) {
            setLoginAttempts(loginAttempts + 1)
            setPassError ('Username and Password does not match')
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

  
    const onClick = () => {
      setCurrentPage('Register')
    }

    useEffect(() => {
        
        setErrorUser('');
        setPassError('');
      }, []);

    return (
        
     <section className="flex flex-col justify-center items-center mt-[100px]">
        <form onSubmit={onSubmit} className="flex flex-col justify-center border-2 p-5 w-[20%] ">
            <label>Username:</label>
            <input 
            type="text" 
            name='username'
            value={loginUser.username}
            onChange={onChange}
            />
            {userError && (<small>{userError}</small>)}
            <label>Password:</label>
            <input
                type="password" 
                name='password'
                value={loginUser.password}
                onChange={onChange}
                required
            />
            {passError && (<small >{passError}</small>)}
            <button id="button1" type="submit" style={{backgroundColor: "white", 
            marginTop: "10px", width: "50px", fontSize: "13px", borderRadius: "50%"}}>Sign-in</button>
            {message && <p>{message}</p>}
        </form>
            <button onClick={onClick}> No account yet? Signup here!</button>
     </section>
    )
}

export default Login