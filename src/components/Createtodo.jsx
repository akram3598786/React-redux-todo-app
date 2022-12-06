 import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addTodo_Done, addTodo_fail, addTodo_Req } from "../Redux/Todo-context/action";
import { getTodo_Done, getTodo_Fail, getTodo_Req } from "../Redux/Todo-context/action";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
   border : 2px solid brown;
   border-radius : 9px;
   padding : 50px 20px;
   width : 50%;
   margin : auto;
   margin-top : 50px;
`;

export const Createtodo=()=>{

    const [title, settitle] = useState();
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const getTodos=()=>{
        dispatch(getTodo_Req());
         axios
          .get("https://json-server-02.onrender.com/Todos")
          .then((res)=>{
              dispatch(getTodo_Done(res.data));
          })
        .catch((err)=>{
          // Error handling
          console.log(err);
          dispatch(getTodo_Fail());
        });
      };

     const addTodo=(payload)=>{
        dispatch(addTodo_Req());
         axios 
        // .post("https://my-databases-json.herokuapp.com/todos", payload)
        .post("https://json-server-02.onrender.com/todos", payload)
        .then((response)=>{
            dispatch(addTodo_Done());
            alert(`${payload.title} Created successfuly`)
            navigate('/')
        })
        .then(()=>{
            navigate("/");
            dispatch(getTodos());
        })
        .catch((err)=>{
            console.log(err);
            dispatch(addTodo_fail());
        })
     }

     const handlesubmit=()=>{
        let payload ={
             title : title,
             sts : false,
        }
       addTodo(payload);
     }

    return (
      <div>
        <h1>Create Todo</h1>  
     <Wrapper>
        <input value={title} type="text" onChange={(e)=>settitle(e.target.value)} />
        <button onClick={()=>handlesubmit()}>Create</button>
     </Wrapper>
     </div>
    );
}