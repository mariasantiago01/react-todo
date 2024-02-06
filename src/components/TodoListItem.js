import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types'

const TodoListItem = ({item, onRemoveTodo, onUpdateTodo}) => {
    return (
        <li className={style.ListItem} key={item.id}>
            {item.title}
            <button className={style.RemoveButton} type='button' onClick={() => onRemoveTodo(item.id)}>Remove</button>
            <button className={style.RemoveButton} type='button' onClick={() => onUpdateTodo(item)}>Update</button>
        </li>
    )
};

TodoListItem.propTypes = {
    item: PropTypes.object,
    onRemoveTodo: PropTypes.func,
    onUpdateTodo: PropTypes.func,
};

export default TodoListItem;