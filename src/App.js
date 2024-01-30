import React from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import style from './App.module.css';
import { FaTasks } from "react-icons/fa";

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

  // NOTE FOR XENIYA (or different grader): Hi! I added a couple of comments above some of the code I've been playing around with, 
  // denoting the potential changes I will be making to it, unless you have any suggestions, which I'm very open to hearing.
  // Thank you in advance for your help, Xeniya! - Maria

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
        console.log("The todo has been successfully posted.")
      } else if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      };

      const dataResponse = await response.json();
      console.log(dataResponse);

      setTodoList([...todoList, dataResponse.fields]);

      //calling on fetchData() to prevent app from crashing when immediately deleting a task that was added.
      fetchData();
      
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const deleteTodo = async (id) => {
    try {
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
      };

      const response = await fetch(url, options);

      if(response.ok) {
        console.log('The todo has been successfully deleted.');
      } else if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const dataResponse = await response.json();
      console.log(dataResponse);

      fetchData();
      
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  const patchTodo = async (todo) => {
    try {
      const id = todo.id;
      const dataToAirtable = {
        fields: {
          title: todo.title //to be updated
        }
      }
      console.log(dataToAirtable);
      const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToAirtable),
      };

      const response = await fetch(url, options);

      console.log(response);
      if(response.ok) {
        console.log('The todo has been successfully updated.');
      } else if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const dataResponse = await response.json();
      console.log(dataResponse);
      setTodoList([...todoList, dataResponse.fields]);

      fetchData();

    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  React.useEffect(() => {fetchData();},[]);

  // The use effect below keeps giving me this message in the terminal/console:
  // "React Hook React.useEffect has a missing dependency: 'isLoading'. Either include it or remove the dependency array"
  // I commented it out and the app worked fine, so I'm thinking of removing it altogether, unless I'm adviced against it.
  // React.useEffect(() => {
  //   let stringifiedTodoList = JSON.stringify(todoList);
  //   if (isLoading === false) {
  //     localStorage.setItem('savedTodoList', stringifiedTodoList);
  //   }
  // }, [todoList]);

  // Since fetchData() is called in postTodo(), and setTodoList updates the state with the fetched airtable data,
  // I might delete the last 2 lines of this addTodo function, (or delete this function altogether and
  // pass postTodo() straight to the onAddTodo={} handler)
  const addTodo = (newTodo) => {

    setTodoList([...todoList, newTodo]);
    postTodo(newTodo);
  }

  // Thinking about removing this removeTodo function as well, and just passing deleteTodo(id) to the 
  // onRemoveTodo={} handler instead, as the app is working fine without the last two lines of code
  const removeTodo = (id) => {
    deleteTodo(id);
    // const newTodoList = todoList.filter((item) => item.id !== id);
    // setTodoList(newTodoList);
  }

  //Under construction. The patchTodo() function works successfully. 
  const editTodo = (newTodoTitle) => {
    patchTodo(newTodoTitle);
    // const newTodoList = todoList.map((item) => {
    //   if (id === item.id) {
    //     return {...TodoList, title: newTodoTitle};
    //   } 
    //   return todoList;
    // })

    // setTodoList(newTodoList); 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {
          <>
            <h1 className={style.TodoTitle}><FaTasks className={style.TodoLogo}/> Todo List</h1>
            
            <AddTodoForm onAddTodo={addTodo}/>

            {isLoading ? (
              <p style={{fontFamily:"Philosopher", color:"#fbf8ca", marginLeft:"1rem"}}>Loading...</p>
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={editTodo}/>
            )}
          </>
        }/> 
        <Route path='/new' element={
          <>
            <h1>New Todo List</h1>
          </>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
