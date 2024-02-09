import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types'

const TodoListItem = ({item, onRemoveTodo, onUpdateTodo}) => {
    const [isBeingEdited, setIsBeingEdited] = React.useState(false);
    const [changedTodo, setChangedTodo] = React.useState(item.title);
 
    const handleEditTodo = () => {
        setIsBeingEdited(true);
    };

    const handleCancelEdit = () => {
        setIsBeingEdited(false);
        setChangedTodo(item.title);
    };

    const handleTitleChange = (event) => {
        const updatedTodoTitle = event.target.value;
        setChangedTodo(updatedTodoTitle);
    };

    const handleChangedTodo = () => {
        onUpdateTodo({
            title: changedTodo,
            id: item.id,
        });
        setChangedTodo(changedTodo);
        setIsBeingEdited(false);
    }; 

    return (
        <>
        { isBeingEdited ? (
            <li className={style.ListItem}> 
                <form>
                    <input 
                    className={style.InputStyling}  
                    type='text' 
                    value={changedTodo} 
                    onChange={handleTitleChange}
                    autoFocus
                    ></input>
                    <button className={style.Button} type='submit' onClick={handleChangedTodo}>Submit</button>
                    <button className={style.Button} type='reset' onClick={handleCancelEdit}>Cancel</button>
                </form>
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