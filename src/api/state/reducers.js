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

function authTokenReducer(state=null, action) {
    switch (action.type) {
        case actions.authTokenAction:
            return action.payload;
        default:
            return state;
    }
}

function authErrorReducer(state=null, action) {
    switch (action.type) {
        case actions.authErrorAction:
            return action.payload;
        default:
            return state;
    }
}

const allReducers = combineReducers({
    editors: editorsReducer,
    authToken: authTokenReducer,
    authError: authErrorReducer
});

export default allReducers;
