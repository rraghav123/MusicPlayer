import { combineReducers } from "redux";
import LoginReducer from "./Login/redux/LoginReducer";
import HomeReducer from "./Home/redux/HomeReducer";

export default combineReducers({
  login: LoginReducer,
  home: HomeReducer
});
