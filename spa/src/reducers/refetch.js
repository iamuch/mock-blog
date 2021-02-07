import {
    REFETCH
} from '../constants';
  
const initialState = {
    refetch: false
};
  
export default (state = initialState, action) => {
    switch (action.type) {
        case REFETCH:
            return { ...state, refetch: action.payload };
        default:

        return state;
    }
};