import { SET_POSTS } from '../constants';
import { SET_POST } from '../constants';
import { SET_BANNERS } from '../constants';

const initialState = {
    newsList: [],
    bannerList: [],
    viewedPost: {}
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS:
            return { ...state, newsList: action.payload};
        case SET_BANNERS:
            return { ...state, bannerList: action.payload};
        case SET_POST:
            return { ...state, viewedPost: action.payload};
        default:

        return state;
    }
};