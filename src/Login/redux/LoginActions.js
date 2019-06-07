import ActionTypes from "./LoginActionTypes";

const LoginActions = {
    setLoadingStatus: payload => ({ type: ActionTypes.SET_LOADING_STATUS, payload })
};

export default LoginActions;
