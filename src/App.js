import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

  const postTodo = async (todo) => {
    try{
      const dataToAirtable = {
        fields: {
          title: todo.title,
        },
      };
      console.log(dataToAirtable);
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
      const options = {
        method: 'POST',
        headers: {
          Authorization:`Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToAirtable)
      };

      const response = await fetch(url, options);

      if (response.ok) {
        console.log("The todo has been sucessfully posted.")
      } else if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      };
      const dataResponse = await response.json();
      console.log(dataResponse);
      setTodoList([...todoList, dataResponse.fields]);
      
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  React.useEffect(() => {fetchData();},[]);

  React.useEffect(() => {
    let stringifiedTodoList = JSON.stringify(todoList);
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', stringifiedTodoList);
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
    postTodo(newTodo);
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {
          <>
            <h1>Todo List</h1>
            
            <AddTodoForm onAddTodo={addTodo}/>

            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
            )}
          </>
        }/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
