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
import { useState } from "react";


export const TodoList = () => {

    const [loading, setloading] = useState(false);
    const [error, setError] = useState(false);
     const [totalItem, settotalItem] = React.useState(0);
     const [Page, setPage] = React.useState(1);

    React.useEffect(() => {
        setloading(true);
        getTodos();
    }, [Page]);

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

    function getTodos() {
        dispatch(getTodo_Req());
        axios
            // .get("http://localhost:8080/Todos")
            .get(`https://my-databases-json.herokuapp.com/todos?_page=${Page}&_limit=16`)
            .then((res) => {
                  let obj = res.headers;
                 let total = obj['x-total-count']
                //  console.log(total)  
                dispatch(getTodo_Done(res.data));
                 settotalItem(+total);
            })
            .catch((err) => {
                setError(true);
                console.log(err);
                dispatch(getTodo_Fail());
            }).finally((res) => setloading(false));
    };


    return (
        <div >
            <h1>Todo List</h1>
            <hr />
            <div className="NoteWall">
                <div className="todopapers">
                    {loading ? <div className="center"><h1 >Loading...</h1></div> :
                        error ? <h1 style={{ 'textAlign': 'center' }}>Something went wrong</h1> :

                            Todos.length > 0 &&
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
                <div id="navi_Btns">
                    <button onClick={() => setPage(Page - 1)} disabled={Page === 1}>Prev</button>
                    <span className="center">{Page}</span>
                    <button onClick={() => setPage(Page + 1)} disabled={Page === Math.ceil(totalItem / 16)}>Next</button>
                </div>
            </div>
        </div>
    );
}