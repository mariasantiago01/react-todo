import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

// This is the main app component. The root component.
const App = () =>{
  // our to do list array
  // const todoList = [
  //   {
  //     id: 1,
  //     title: "finish current book",
  //   },
  //   {
  //     id: 2,
  //     title: "complete homework",
  //   },
  //   {
  //     id: 3,
  //     title: "plan out week ahead",
  //   },
  //   {
  //     id: 4,
  //     title: "do laundry",
  //   },
  // ];
  
  const [newTodo, setNewTodo] = React.useState('');

  const [todoList, setTodoList] = React.useState({});



  return (
    <div>
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={setNewTodo}/>
      
      <p>{newTodo}</p>

      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App;
