import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import canban from "./canban/reducer"

const rootReducer = combineReducers({
  auth: authReducer,
  canban
})

export default rootReducer;