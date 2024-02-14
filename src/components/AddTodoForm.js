import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import PropTypes from "prop-types";

const AddTodoForm  = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = React.useState('');
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({
            title: todoTitle,
        });
        setTodoTitle('');
    };

    return (
        <>
            <form className={style.FormStyling} onSubmit={handleAddTodo}>
                <InputWithLabel
                id='todoTitle'
                name='title'
                value={todoTitle}
                onChange={handleTitleChange}
                >Title:</InputWithLabel>
                <button className={style.AddButton} type='submit'>Add</button>
            </form>
        </>
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
};

export default AddTodoForm;
