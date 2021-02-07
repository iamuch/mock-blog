import { AUTH_SIGNIN, AUTH_SIGNOUT } from '../constants';

const login = (token, user) => {
    console.log(token, user);
    return { 
        type: AUTH_SIGNIN,
        payload: user,
        token: token
    };
};
  
const logout = () => {
    return { 
        type: AUTH_SIGNOUT
    };
};

export default {
    login,
    logout
}