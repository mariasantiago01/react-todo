import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import PropTypes from "prop-types";
import style from './TodoContainer.module.css';

const TodoContainer = ({tableName}) => {
    const [todoList, setTodoList] = React.useState([]); 
    const [isLoading, setIsLoading] = React.useState(true);

    const [sortTable, setSortTable] = React.useState(
      localStorage.getItem('sortTable') || 'AZ');
    
    React.useEffect(() => {
      localStorage.setItem('sortTable', sortTable);
    }, [sortTable]);

    const handleSortTable = (event) => {
      let value = event.target.value;
        setSortTable(value);
        fetchData(tableName);
    }

    const fetchData = async (tableName, sortTable) => {
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;
        const options = {
          method: 'GET',
          headers: {
            Authorization:`Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        };

        try {
          const response = await fetch(url, options);
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          };
    
          const data = await response.json();

          if (sortTable === 'AZ') {

            data.records.sort((itemA, itemB) => {
              if (itemA.fields.title < itemB.fields.title) {
                  return -1;
              } else if (itemA.fields.title > itemB.fields.title) {
                  return 1;
              } else {
                  return 0;
              }
            });

          } else if (sortTable === 'ZA') {
            data.records.sort((itemA, itemB) => {
              if (itemA.fields.title < itemB.fields.title) {
                  return 1;
              } else if (itemA.fields.title > itemB.fields.title) {
                  return -1;
              } else {
                  return 0;
              }
            });
          };

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

    React.useEffect(() => {fetchData(tableName, sortTable);},[tableName,sortTable]);

    const baseURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`

    const addTodo = async (todo) => {
        try{
          const dataToAirtable = {
            fields: {
              title: todo.title,
            },
          };
          const url = `${baseURL}`;
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
    
          setTodoList([...todoList, dataResponse.fields]);
    
          fetchData(tableName, sortTable);
          
        } catch (error) {
          console.log(error.message);
          return null;
        }
    };
    
    const removeTodo = async (id) => {
        try {
          const url = `${baseURL}/${id}`;
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
    
          fetchData(tableName, sortTable);
          
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
              title: todo.title
            }
          }
          console.log(dataToAirtable);
          const url = `${baseURL}/${id}`;
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
    
          fetchData(tableName, sortTable);
    
        } catch (error) {
          console.log(error.message);
          return null;
        }
    };

    return (
        <>
        <div className={style.TitleFormDiv}>
          <h1 className={style.TableName}> {tableName}</h1>
          <AddTodoForm onAddTodo={addTodo}/>
        </div>

        <div className={style.SortDiv}>
          <span className={style.SortTitle}>Sort:</span>
          <select className={style.Sort} onChange={handleSortTable} id='sortTable'>
            <option value='AZ'>A-Z</option>
            <option value='ZA'>Z-A</option>
          </select>
        </div>

        {isLoading ? (
            <p style={{fontFamily:"Philosopher", color:"#fbf8ca", marginLeft:"1.5rem"}}>Loading...</p>
        ) : (
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} onUpdateTodo={editTodo}/>
        )}
        </>
      );
}

TodoContainer.propTypes = {
    tableName: PropTypes.string,
}

export default TodoContainer;