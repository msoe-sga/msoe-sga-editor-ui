import * as actions from './actions';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authToken']
}

const persistedReducer = persistReducer(persistConfig, allReducers);

export default persistedReducer;
