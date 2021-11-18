import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import TodoReducer from "../../views/app-views/todo/redux/reducers/todoReducer";


const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  
  todo: TodoReducer,
 

});

export default reducers;
