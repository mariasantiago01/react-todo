import React from 'react';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import style from './App.module.css';
import { FaTasks } from "react-icons/fa";

// This is the main app component. The root component.
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {
          <>
            <h1 className={style.TodoTitle}><FaTasks className={style.TodoLogo}/>Todo List</h1>
            <TodoContainer/>
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
