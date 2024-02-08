import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import PropTypes from "prop-types";

const TodoContainer = ({tableName}) => {
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

          data.records.sort((itemA, itemB) => {
            if (itemA.fields.title < itemB.fields.title) {
                return -1;
            } else if (itemA.fields.title > itemB.fields.title) {
                return 1;
            } else {
                return 0;
            }
          });

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

    React.useEffect(() => {fetchData();},[]);

    const addTodo = async (todo) => {
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
    
    const removeTodo = async (id) => {
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
    };
    
    const editTodo = async (todo) => {
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
    };

    return (
        <>
        <AddTodoForm onAddTodo={addTodo}/>

        {isLoading ? (
            <p style={{fontFamily:"Philosopher", color:"#fbf8ca", marginLeft:"1rem"}}>Loading...</p>
        ) : (
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={editTodo}/>
        )}
        </>
      );
}

TodoContainer.propTypes = {
    tableName: PropTypes.any,
}

export default TodoContainer;