import { combineReducers } from 'redux';

// Reducers.
import InfoReducer from './InfoReducer';

/**
 * Combine the reducers and map them to lowercase.
 */
export default combineReducers({
    info: InfoReducer
});
