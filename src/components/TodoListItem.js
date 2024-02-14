import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types'
import { HiTrash, HiPencilAlt, HiX, HiCheck } from "react-icons/hi";

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
                <form className={style.EditingForm} id='editForm'>
                    <input 
                    className={style.InputStyling}  
                    id='editingInput'
                    type='text' 
                    value={changedTodo} 
                    onChange={handleTitleChange}
                    autoFocus
                    ></input>
                    <button className={style.Button} type='submit' onClick={handleChangedTodo}><HiCheck className={style.ButtonLogo}/></button>
                    <button className={style.Button} type='reset' onClick={handleCancelEdit}><HiX className={style.ButtonLogo}/></button>
                </form>
            </li>
        ) : (
            <li className={style.ListItem}>
                {item.title}
                <button className={style.Button} type='button' onClick={handleEditTodo}><HiPencilAlt className={style.ButtonLogo}/></button>
                <button className={style.Button} type='button' onClick={() => onRemoveTodo(item.id)}><HiTrash className={style.ButtonLogo}/></button>
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