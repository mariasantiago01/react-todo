import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import todoTitle from './AddTodoForm'

// This is the main app component. The root component.
const App = () =>{
  const [todoList, setTodoList] = React.useState([]);
  
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo}/>

      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App;
