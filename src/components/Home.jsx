import { Link, useNavigate } from "react-router-dom";
import { TodoItem } from "./TodoItem";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getTodo_Done, getTodo_Fail, getTodo_Req } from "../Redux/Todo-context/action";
// import NotePaper from "./NotePaper";
 import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import "./Style.css";


export const TodoList = () => {

    React.useEffect(() => {
     getTodos();
    }, []);

    const dispatch = useDispatch();  
    const Todos = useSelector((store) => { return store.todos.todos }); 

    /*
    const {isLoading , todos, isError} = useSelector((state) => {
        return {
            isLoading  : state.isLoading,
           // todos : state.todos,
            isError : state.isError,
        }
    });
    */ 

    function getTodos(){ 
        dispatch(getTodo_Req());
        axios
            .get("http://localhost:8080/Todos")
            .then((res) => {
                // console.log(res.data)
                dispatch(getTodo_Done(res.data));
            })
            .catch((err) => {
                // Error handling
                console.log(err);
                dispatch(getTodo_Fail());
            });
    };


    return (
        <div >
            <h1>Todo List</h1>
            <hr />
            <div className="NoteWall">
            <div className="todopapers">
                {Todos.length > 0 &&
                    Todos.map((todo) => {
                        // <td style={{"color":"blueviolet"}}><Link to={`${prod.id}`}>See Details..</Link></td>
                        //  return <Link to="/"><TodoItem/></Link>
                        return <div>
                            <Box
                                sx={{
                                    display: 'flex',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 128,
                                
                                    },
                                }}
                            >  
                                <Paper className='NotePaper' variant="outlined" square >
                                <h3 key={todo.id}>{todo.title}</h3>
                                <Link to={`/Todos/${todo.id}`}>See Detail</Link>
                                </Paper>
                            </Box>
                            {/* <NotePaper /> */}
                           
                        </div>
                    })
                }
            </div>
        </div>
        </div>
    );
}