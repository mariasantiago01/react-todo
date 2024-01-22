import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';

const AddTodoForm  = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle] = React.useState('');
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        console.log(todoTitle);
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
}

export default AddTodoForm;
