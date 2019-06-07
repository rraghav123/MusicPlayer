import ActionTypes from "./LoginActionTypes";

const initialState = {
    isLoading: true
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_LOADING_STATUS:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};

export default LoginReducer;
