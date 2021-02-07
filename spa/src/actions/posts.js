import { SET_POSTS } from '../constants';
import { SET_BANNERS } from '../constants';
import { SET_POST } from '../constants';

const setPost = (post) => {
    return { 
        type: SET_POST,
        payload: post
    };
}

const setPosts = (posts) => {
    return { 
        type: SET_POSTS,
        payload: posts
    };
}

const setBanners = (posts) => {
    return { 
        type: SET_BANNERS,
        payload: posts
    };
}

export default {
    setPosts,
    setBanners,
    setPost
}