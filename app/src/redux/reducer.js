import { combineReducers } from "redux";
import clientReducer from "./slices/clientSlice"
import therapistReducer from "./slices/therapistSlice"

export default combineReducers({
  client: clientReducer,
  therapist: therapistReducer
});
