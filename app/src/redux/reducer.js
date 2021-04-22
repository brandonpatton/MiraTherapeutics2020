import { combineReducers } from "redux";
import clientReducer from "./slices/clientSlice"
import therapistReducer from "./slices/therapistSlice"
import assignmentReducer from "./slices/assignmentSlice"

export default combineReducers({
  client: clientReducer,
  therapist: therapistReducer,
  assignment: assignmentReducer
});
