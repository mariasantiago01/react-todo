import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from 'prop-types';

const TodoList = ({todoList, onRemoveTodo, onUpdateTodo}) => {
  return (
    <>
      <ul style={{padding:"0 1rem", marginTop:'0'}}> 
        {todoList.map((item) => (
            <TodoListItem 
            key={item.id + 1} //item.id was still giving me a "children need a key prop" warning, so I just added a + 1.
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