import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

// This is our custom hook, outside of the main app component
const useSemiPersistentState = () => {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  );

  React.useEffect(() => {
    let stringifiedTodoList = JSON.stringify(todoList);
    localStorage.setItem('savedTodoList', stringifiedTodoList);
  }, [todoList]);

  return [todoList, setTodoList];
}


// This is the main app component. The root component.
const App = () =>{
  const [todoList, setTodoList] = useSemiPersistentState();

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo}/>

      <TodoList todoList={todoList}/>
    </>
  );
}

export default App;
