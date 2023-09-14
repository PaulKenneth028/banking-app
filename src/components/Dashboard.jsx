

const Dashboard = (props) => {
    const { user } = props
    return (
        <div>Welcome {user.Username}!,</div>
    )
}

export default Dashboard