import React from 'react';

const InputWithLabel = ({id, label, type='text', name, value, onChange}) => {

    return (
        <>
            <label htmlFor={id}>{label}</label>
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