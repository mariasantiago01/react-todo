import React from "react";

const todoList = [
    {
      id: 1,
      title: "finish current book",
    },
    {
      id: 2,
      title: "complete homework",
    },
    {
      id: 3,
      title: "plan out week ahead",
    },
    {
      id: 4,
      title: "do laundry",
    },
];

function TodoList () {
    return (
        <div>
            <ul>
                {todoList.map(function (item) {
                    return <li key={item.id}>{item.title}</li>;
                })}
            </ul>
        </div>
    )
}

export default TodoList;