import { combineReducers } from "redux";
import HomeReducer from "./Home/redux/HomeReducer";

export default combineReducers({
  home: HomeReducer
});
