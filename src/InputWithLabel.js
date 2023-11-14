import React from 'react';

const InputWithLabel = ({id, children, type='text', name, value, onChange}) => {

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input 
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            ></input>
        </>
    );
};

export default InputWithLabel;