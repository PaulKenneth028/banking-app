

const Dashboard = (props) => {
    const { user } = props
    return (
        <div className="m-5">Welcome {user.Username}!,</div>

    )
}

export default Dashboard