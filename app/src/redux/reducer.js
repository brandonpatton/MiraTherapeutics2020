import { combineReducers } from "redux";

/*import authReducer from "./slices/authSlice";
import gamesReducer from "./slices/gamesSlice";
import recordsReducer from "./slices/recordsSlice";
import videosReducer from "./slices/videosSlice";*/
import clientReducer from "./slices/clientSlice"

export default combineReducers({
  /*auth: authReducer,
  games: gamesReducer,
  records: recordsReducer,
  videos: videosReducer*/
  client: clientReducer
});
