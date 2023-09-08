import Input from "./InputLogin"

const LoginForm = () => {
    return (
        <form>
            <Input
                label='username'
                type='text'
            />

            <Input
                label='password'
                type='password'
            />

            <button type="submit">Sign-in</button>
        </form>
    )
}

export default LoginForm