

const Input = (props) => {
    const { label, type, id, value, onChange, required,} = props;

    return (
        <>
            <label className="flex justify-center" >{label}</label>
            <input
                title={label}
                type={type}
                id={id}
                onChange={onChange}
                value={value}
                required={required}
            />
        </>
    )
}

export default Input;