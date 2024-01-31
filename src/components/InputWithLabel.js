import React from 'react';
import style from './InputWithLabel.module.css'
import PropTypes from 'prop-types';

const InputWithLabel = ({id, children, type='text', name, value, onChange}) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input 
            className={style.InputStyling}
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            ref={inputRef}
            placeholder='What would you like to get done?'
            ></input>
        </>
    );
};

InputWithLabel.propTypes = {
    id: PropTypes.string,
    children:PropTypes.node,
    type:PropTypes.elementType,
    name:PropTypes.string,
    value:PropTypes.string,
    onChange: PropTypes.func,
};

export default InputWithLabel;