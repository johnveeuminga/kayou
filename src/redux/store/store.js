import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { compact } from 'lodash';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import sagas from '../sagas';

import { composeWithDevTools } from "remote-redux-devtools";

const sagaMiddleware = createSagaMiddleware();

const middlewares = compact([
  thunk.withExtraArgument(),
  sagaMiddleware,
  __DEV__ ? createLogger() : null,
])

let debugWrapper = data => data;

if (__DEV__) {
  debugWrapper = composeWithDevTools({ realtime: true, port: 8081 })
}

export const store = createStore(
  rootReducer,
  {},
  debugWrapper(compose(applyMiddleware(...middlewares))),
);

export const persistor = persistStore(
  store,
);

sagaMiddleware.run(sagas);
