import React from 'react';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './App.module.css';
import { FaTasks, FaHome } from "react-icons/fa";

const App = () => {
  const [tableName, setTableName] = React.useState(
    localStorage.getItem('tableName') || process.env.REACT_APP_TABLE_ONE_NAME);

  const handleChooseTasks = () => {
    setTableName(process.env.REACT_APP_TABLE_ONE_NAME);
    localStorage.setItem('tableName', process.env.REACT_APP_TABLE_ONE_NAME);
  };

  const handleChooseGoals = () => {
    setTableName(process.env.REACT_APP_TABLE_TWO_NAME);
    localStorage.setItem('tableName', process.env.REACT_APP_TABLE_TWO_NAME);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
            <>
              <nav className={style.Nav}>
                <h1 className={style.TodoTitle}><FaTasks className={style.TodoLogo}/>  Todo List</h1>
              </nav>
              <div className={style.MenuItems}>
                <Link className={style.MyTasksDiv} to='/todoList' onClick={handleChooseTasks}>
                  My Tasks
                </Link>
                <Link className={style.MyTasksDiv} to='/todoList' onClick={handleChooseGoals}>
                  My Goals
                </Link>
              </div>
            </>
          }/>
        <Route path="/todoList" element= {
          <>
            <nav className={style.Nav}>
              <h1 className={style.TodoTitle}><FaTasks className={style.TodoLogo}/>  Todo List</h1>
              <button id='goHome'className={style.HomeButton}> <a href='/'><FaHome className={style.HomeLogo}/> </a></button>
            </nav>
            <span className={style.Path}> <a href='/' className={style.Link}>Home</a>/<a href='/todoList' className={style.Link}>{tableName}</a></span>
            <TodoContainer tableName={tableName}/>
          </>
          }/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
