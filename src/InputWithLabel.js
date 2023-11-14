import React from 'react';

const InputWithLabel = ({id, name, value, onChange}) => {

    return (
        <>
            <label htmlFor={id}>Title:</label>
            <input 
            id={id}
            type='text'
            name={name}
            value={value}
            onChange={onChange}
            ></input>
        </>
    );
};

export default InputWithLabel;