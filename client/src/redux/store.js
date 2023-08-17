// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers'
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { logger } from 'redux-logger';

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))
// console.error('initial state', store.getState());

const store = configureStore({
    reducer: {
        users: userReducer,
    },
    middleware:[logger]
})

initMessageListener(store);

export default store