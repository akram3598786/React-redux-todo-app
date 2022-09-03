import * as types from "./action-type.js";

let initState = {
    todos : [],
    isLoading : false,
    isError : false,
}

export const Todoreducer=(state=initState, action)=>{
  
    const {type, payload} = action;

    switch(type){     
       
        case types.GET_TODO_REQUEST : {
            return {...state, isLoading : true, isError: false}   
        }

        case types.GET_TODO_DONE : {
            return {...state,isLoading : false, todos : [...payload], isError : false}    
        }
        case types.GET_TODO_FAIL : {
            return {...state, isLoading : false, isError : true}
        }

        default: {
            return state;
        }
          
        
    }
}