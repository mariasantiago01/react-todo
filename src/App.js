import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


// This is the main app component. The root component.
const App = () =>{
  const [todoList, setTodoList] = React.useState([]); 
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    new Promise((resolve, reject) => 
      setTimeout(
        () => resolve({ data: { todoList: JSON.parse(localStorage.getItem('savedTodoList'))}}),
        2000
      )
    ).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    })
  },[]);

  React.useEffect(() => {
    let stringifiedTodoList = JSON.stringify(todoList);
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', stringifiedTodoList);
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <>
      <h1>Todo List</h1>
      
      <AddTodoForm onAddTodo={addTodo}/>

      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </>
  );
}

export default App;
