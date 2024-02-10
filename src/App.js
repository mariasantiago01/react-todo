import React from 'react';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import style from './App.module.css';
import { FaTasks, FaHome } from "react-icons/fa";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
            <>
              <nav className={style.Nav}>
                <h1 className={style.TodoTitle}><FaTasks className={style.TodoLogo}/>  Todo List</h1>
              </nav>
              <div>
                <div>
                  <a href='/todoList'>My Current Todo List</a>
                </div>
              </div>
            </>
          }/>
        <Route path="/todoList" element= {
          <>
            <nav className={style.Nav}>
              <h1 className={style.TodoTitle}><FaTasks className={style.TodoLogo}/>  Todo List</h1>
              <button id='editButton'className={style.HomeButton}> <a href='/'><FaHome className={style.HomeLogo}/> </a> </button>
            </nav>
            <span className={style.Path}> <a href='/' className={style.Link}>Home</a>/<a href='/todoList' className={style.Link}>Todo Table 1</a></span>

            <TodoContainer/>
          </>
          }/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
