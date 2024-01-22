import React from 'react';
import style from './TodoListItem.module.css';

const TodoListItem = ({item, onRemoveTodo}) => {
    return (
        <li className={style.ListItem}>
            {item.title}
            <button className={style.RemoveButton} type='button' onClick={() => onRemoveTodo(item.id)}>Remove</button>
        </li>
    )
}

export default TodoListItem;