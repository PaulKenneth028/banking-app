import Input from "./InputLogin"


const LoginForm = () => {
    return (
     <section className="form1">
        <form>
            <Input
                label='Username'
                type='text'
            />

            <Input
                label='Password'
                type='password'
                required
            />

            <button id="button1" type="submit">Sign-in</button>
        </form>
     </section>
    )
}

export default LoginForm