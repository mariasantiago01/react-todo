import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


// This is the main app component. The root component.
const App = () => {
  const [todoList, setTodoList] = React.useState([]); 
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {

    const options = {
      method: 'GET',
      headers: {
        Authorization:`Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      };

      const data = await response.json();

      const todos = data.records.map((todo) => { 
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
        };
        return newTodo;
      });

      setTodoList(todos);
      setIsLoading(false);

    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => { fetchData(); },[]);

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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
      )}
    </>
  );
}

export default App;
