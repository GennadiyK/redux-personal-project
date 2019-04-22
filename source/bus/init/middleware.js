import { applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const logger = createLogger({
    duration: true,
    collapsed: true,
    colors: {
        title: () => '#139bfe',
        prevState: () => '#1c5faf',
        action: () => '#149945',
        nextState: () => '#a47104',
        error: () => '#ef0005',
    }
})

export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, sagaMiddleware];

if(__DEV__) {
    middleware.push(logger);
}

export const enhancedStore  = composeEnhancers(applyMiddleware(...middleware));

