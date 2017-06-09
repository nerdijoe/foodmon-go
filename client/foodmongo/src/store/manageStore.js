import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import FoodMongoApp from '../reducers';

const middlewares = applyMiddleware(logger, thunk);

const store = createStore(FoodMongoApp, middlewares);

export default store;
