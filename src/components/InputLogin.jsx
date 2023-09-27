

const Input = (props) => {
    const { label, type, id, value, onChange, required, placeholder} = props;

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
                placeholder={placeholder}
            />
        </>
    )
}

export default Input;