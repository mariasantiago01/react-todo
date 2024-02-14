import React from 'react';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './App.module.css';
import { FaTasks, FaHome } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";


const App = () => {
  const [tableName, setTableName] = React.useState(
    localStorage.getItem('tableName') || process.env.REACT_APP_TABLE_ONE_NAME
  );

  React.useEffect(() => {
    localStorage.setItem('tableName', tableName);
  }, [tableName]);

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

              {/* <span className={style.Path}>Home</span> */}

              <div className={style.MenuDiv}>
                <div className={style.TablesOuterDiv}>
                  <h2 className={style.TablesHeading}> My Lists </h2>
                  <div className={style.TableItems}>

                    <Link className={style.Table} to='/todoList' onClick={handleChooseTasks}>
                    <LuListTodo className={style.Logo}/> My Tasks
                    </Link>

                    <Link className={style.Table} to='/todoList' onClick={handleChooseGoals}>
                    <GoGoal className={style.Logo}/> My Goals
                    </Link>

                  </div>
                </div>
              </div>
            </>
          }/>
        <Route path="/todoList" element= {
          <>
            <nav className={style.Nav}>

              <h1 className={style.TodoTitle}><FaTasks className={style.TodoLogo}/>  Todo List</h1>
              <Link to='/'className={style.HomeButton}>
                <FaHome className={style.HomeLogo}/> 
              </Link>

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
