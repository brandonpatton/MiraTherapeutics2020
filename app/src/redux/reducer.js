import { combineReducers } from "redux";
import clientReducer from "./slices/clientSlice"

export default combineReducers({
  client: clientReducer
});
