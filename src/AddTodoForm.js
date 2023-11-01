import React from 'react';

const AddTodoForm  = (props) => {
    const [todoTitle, setTodoTitle] = React.useState('');
    
    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        // console.log(newTodoTitle);
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        // let todoTitle = event.target.elements.title.value;
        console.log(todoTitle);
        props.onAddTodo(todoTitle);
        event.target.reset();
    };

    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor='todoTitle'>Title</label>
                <input 
                id='todoTitle' 
                name='title'
                value={props.todoTitle}
                onChange={handleTitleChange}
                ></input>
                <button type='submit'>Add</button>
            </form>
        </div>
    );
}

export default AddTodoForm;