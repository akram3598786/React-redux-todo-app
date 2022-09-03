
import {combineReducers, legacy_createStore} from "redux";
import { Todoreducer} from "./Todo-context/reducer.js";
import { Authreducer} from "./Auth-context/reducer.js";

const rootReducer = combineReducers({
    todos : Todoreducer,
    isAuth : Authreducer 
});

export const store = legacy_createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    
    store.subscribe(()=>{
        console.log(store.getState());
    })