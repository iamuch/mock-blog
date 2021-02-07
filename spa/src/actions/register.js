import { AUTH_SIGNIN, AUTH_SIGNOUT } from '../constants';

const register = (user) => {
    return { 
        type: AUTH_SIGNIN,
        payload: user
    };
};

export default {
    register
}