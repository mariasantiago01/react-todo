import React from 'react';
import style from './TodoListItem.module.css';

const TodoListItem = ({item, onRemoveTodo, onUpdateTodo}) => {
    return (
        <li className={style.ListItem} key={item.id}>
            {item.title}
            <button className={style.RemoveButton} type='button' onClick={() => onRemoveTodo(item.id)}>Remove</button>
            <button className={style.RemoveButton} type='button' onClick={() => onUpdateTodo(item)}>Update</button>
        </li>
    )
}

export default TodoListItem;