import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = (props) => {
  return (
    <div>
      <ul>
        {props.todoList.map((item) => (
            <TodoListItem key={item.id} item={item}/>
        ))}
      </ul>
    </div>
  )
}

export default TodoList;