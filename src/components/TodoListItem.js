import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types'

const TodoListItem = ({item, onRemoveTodo, onUpdateTodo}) => {
    const [isBeingEdited, setIsBeingEdited] = React.useState(false);
    const [changedTodo, setChangedTodo] = React.useState('');

    const handleEditTodo = () => {
        setIsBeingEdited(true);
    }
    
    const handleTitleChange = (event) => {
        const updatedTodoTitle = event.target.value;
        setChangedTodo(updatedTodoTitle);
    };

    const handleChangedTodo = () => {
        onUpdateTodo({
            title: changedTodo,
            id: item.id,
        });
        setChangedTodo('');
        setIsBeingEdited(false);
    }; 

    return (
        <>
        { isBeingEdited ? (
            <li className={style.ListItem}> 
                <input type='text' name='' placeholder={item.title} onChange={handleTitleChange}></input>
                <button className={style.Button} type='submit' onClick={handleChangedTodo}>Submit</button>
                <button className={style.Button} type='reset'>Cancel</button>
            </li>
        ) : (
            <li className={style.ListItem} key={item.id}>
                {item.title}
                <button className={style.Button} type='button' onClick={() => onRemoveTodo(item.id)}>Remove</button>
                <button className={style.Button} type='button' onClick={handleEditTodo}>Edit</button>
            </li> 
        )}
        </>
    )
};

TodoListItem.propTypes = {
    item: PropTypes.object,
    onRemoveTodo: PropTypes.func,
    onUpdateTodo: PropTypes.func,
};

export default TodoListItem;