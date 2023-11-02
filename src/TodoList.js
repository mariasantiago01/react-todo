import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({todoList}) => {
  return (
    <div>
      <ul>
        {todoList.map((item) => (
            <TodoListItem key={item.id} item={item}/>
        ))}
      </ul>
    </div>
  )
}

export default TodoList;