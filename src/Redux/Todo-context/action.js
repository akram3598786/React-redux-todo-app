import * as types from "./action-type.js";

  export const getTodo_Req=()=>{
    return {
        type : types.GET_TODO_REQUEST,
    }
  }

  export const getTodo_Done=(data)=>{
    return {
        type : types.GET_TODO_DONE,
        payload : data,
    }
  }

  export const getTodo_Fail=()=>{
    return {
        type : types.GET_TODO_FAIL,
    }
  }
  
  export const addTodo_Req=()=>{
    return {
        type : types.POST_TODO_REQUEST,

    }
  }
  
  export const addTodo_Done=()=>{
    return {
        type : types.POST_TODO_DONE,

    }
  }

  export const addTodo_fail=()=>{
    return {
        type : types.POST_TODO_FAIL,
    }
  }

  
