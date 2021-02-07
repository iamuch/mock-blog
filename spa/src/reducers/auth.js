import {
    AUTH_SIGNIN,
    AUTH_SIGNOUT
} from '../constants';
  
const initialState = {
    authenticated: false,
    token: "",
    user: {}
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SIGNIN:
            if(action.token !== "") {
                localStorage.setItem('token', action.token);
                return { ...state, user: action.payload,
                    authenticated: true, 
                    token: action.token };
            }
            break;
        case AUTH_SIGNOUT:
            localStorage.removeItem('token');
            return { ...state, authenticated: false, user: null, token: null };
        default:

        return state;
    }
};