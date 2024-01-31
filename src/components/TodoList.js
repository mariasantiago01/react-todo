import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from 'prop-types';

const TodoList = ({todoList, onRemoveTodo, onUpdateTodo}) => {
  return (
    <>
      <ul style={{padding:"0 1rem"}}> 
        {todoList.map((item) => (
            <TodoListItem 
            key={item.id} 
            item={item} 
            onRemoveTodo={onRemoveTodo}
            onUpdateTodo={onUpdateTodo}/>
        ))}
      </ul>
    </>
  )
};

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onUpdateTodo: PropTypes.func,
};

export default TodoList;