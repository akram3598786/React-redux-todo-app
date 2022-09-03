import logo from './logo.svg';
import './App.css';
import { TodoList } from './components/Home';
import { Navbar } from './components/Navbar';
import {Routes, Route, useNavigate} from "react-router-dom";
import { Createtodo } from './components/Createtodo';
import { TodoItem } from './components/TodoItem';
import { LoginForm } from './components/Login';
import { useSelector } from 'react-redux';



function App() {

  const isAuth = useSelector((store)=>store.isAuth.isAuth);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar/>
      {isAuth 
      ? (<Routes>
     
      <Route path='/' element={<TodoList/> }></Route>
      <Route path='/createtodo' element={<Createtodo/>}></Route>
      <Route path='/Todos/:TodoId' element={<TodoItem/>}></Route>
      <Route path='/login' element={<LoginForm/>}></Route>
    </Routes>)
      : <LoginForm/>}
      

    </div>
  );
}

export default App;
