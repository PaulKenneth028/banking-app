

const LinkedCards = (props) => {
    const { user, setCurrentPage } = props

    const dashboardBtn = ((e) => {
        e.preventDefault()
        setCurrentPage('dashboard')
    }) 

    return (
        <div>
        <h1>hello World!</h1>
        <button onClick={dashboardBtn}>dashboard</button>
        </div>
    )
}

export default LinkedCards