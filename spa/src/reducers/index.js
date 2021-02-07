import {combineReducers} from 'redux'
import auth from './auth';
import posts from './posts';

const reducers = combineReducers({
    auth,
    posts
})

export default reducers;