import * as actions from './actions';
import { combineReducers } from 'redux';

function editorsReducer(state=[], action) {
    switch (action.type) {
        case actions.editorsAction:
            return action.payload;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    editors: editorsReducer
});

export default allReducers;
