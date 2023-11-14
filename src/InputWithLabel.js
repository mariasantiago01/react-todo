import React from 'react';

const InputWithLabel = ({id, children, type='text', name, value, onChange}) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.focus();
    })

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input 
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            ref={inputRef}
            ></input>
        </>
    );
};

export default InputWithLabel;