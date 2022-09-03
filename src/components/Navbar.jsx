 import styled from "styled-components";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../Redux/Auth-context/action";
import { useNavigate } from "react-router-dom";



export const Navbar=()=>{
  const isAuth = useSelector((store)=>store.isAuth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    let Navbar = styled.div`
      background-color : brown;
      padding : 10px 0px;

      & : link {
        background-color : white;
        margin : 0px 30px;
        width : 200px;
        list-style : none;
        text-decoraion : none ;
        border-radius : 6px;
        padding : 5px;
        color : white;
        transition-delay:  ease-in linear 2s;
      }
      & : hover{
        background-color : brown;
        color : white;
      }
    `;

    const handleLogout=()=>{
      dispatch(isAuth(false))
      navigate("/login");
    }

    return (
      <Navbar>
        <Link to="/">Home</Link>
        <Link to="/createtodo">CreateTodo</Link>
        <Link to="/login" onClick={()=>handleLogout()}>{isAuth ? <button>Logout</button> : <button>Login</button>} </Link>
      </Navbar>
    );
}