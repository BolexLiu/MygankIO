import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import { DEBUG, RDEBUG } from '../Constants';

const reducer = combineReducers(reducers);
const logger = store => next => action => {
    if (!DEBUG || !RDEBUG) return next(action);

    if (typeof action === 'function') {
        console.log('>>>> logger => dispatching a function');
    } else {
        console.log('>>>> logger => dispatching', action);
    }

    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}