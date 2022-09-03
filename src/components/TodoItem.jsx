import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo_Done, getTodo_Done, getTodo_Req } from "../Redux/Todo-context/action";
import { useState } from "react";



export const TodoItem = () => {

   const [Todoitem, setTodoitem] = useState({});
   const { TodoId } = useParams();
   const navigate = useNavigate();

   let Wrapper = styled.div`
 display : flex;
 justify-content : space-around;
 flex-direction : column;
`;
   let Div = styled.div`
display : flex;
justify-content : space-around;
`;
   let StsButton = styled.button`
  background-color : ${Todoitem.sts ? "green" : "yellow"};
  border-radius : 9px;
  cursor : pointer;
  color : ${Todoitem.sts ? "white" : "black"};
`;
   const getTodoitem = () => {
      axios
         .get(`http://localhost:8080/Todos/${TodoId}`)
         .then((res) => {
            //   console.log(res);
            setTodoitem(res.data);
         })
         .catch((err) => console.log(err));
   }

   const changeSts = () => {
      Todoitem.sts = Todoitem.sts ? false : true;
      axios
         .patch(`http://localhost:8080/Todos/${TodoId}`, Todoitem, 'Content-Type": "application/json')
         .then(() => getTodoitem())

      /*
      fetch(`http://localhost:8080/Todos/${TodoId}`, {
         method : "PATCH",
         body : JSON.stringify(Todoitem),
         headers : {
            "Content-Type": "application/json",
         }
      })
      .then(()=>{
         getTodoitem();
      })
      */
   }



   const handleDelete = () => {
      axios
         .delete(`http://localhost:8080/Todos/${TodoId}`)
         .then(() => {
            alert("Todo deleted")
            navigate("/");
         });

      /*
      fetch(`http://localhost:8080/Todos/${TodoId}`, {
         method : "DELETE",
         headers : {
            "Content-Type": "application/json",
         }
      })
      .then(()=>{
         alert("Todo deleted")
         navigate("/");
      })
      */
   }
   
   useEffect(() => {
      getTodoitem();
   }, []);

   return (
      <Wrapper>
         <Div>
            <h1>Todo Id</h1>
            <h1>Todo Title</h1>
            <h1>Status</h1>
            <h1>Delete</h1>
         </Div>
         <Div>
            <h2>{TodoId}</h2>
            <h2>{Todoitem.title}</h2>
            <StsButton onClick={() => changeSts()}>{Todoitem.sts ? "Completed" : "Pending"}</StsButton>
            <button onClick={() => handleDelete()}>Delete</button>
         </Div>
      </Wrapper>
   );
}