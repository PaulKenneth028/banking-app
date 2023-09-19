

const Input = (props) => {
    const { label, type, id, required} = props;

    return (
        <>
            <label>{label}</label>
            <input
                title={label}
                type={type}
                id={id}
                required={required}
            />
        </>
    )
}

export default Input;