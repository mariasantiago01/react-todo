import React from "react";
import TodoListItem from "./TodoListItem";

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
}

export default TodoList;