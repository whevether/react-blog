
import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import promiseMiddleWare from '../api/promiseMiddleware';
import {routerMiddleware} from 'react-router-redux';

export default function configureStore(history,initialState) {
  const middlewares = [
    reduxImmutableStateInvariant(),
    promiseMiddleWare,
    thunkMiddleware,
  ];


  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares,routerMiddleware(history))
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
