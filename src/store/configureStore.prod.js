import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import {routerMiddleware} from 'react-router-redux';
import promiseMiddleWare from '../api/promiseMiddleware';
export default function configureStore(history,initialState) {
  const middlewares = [
    thunkMiddleware,
    promiseMiddleWare
  ];
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares,routerMiddleware(history))
    )
  );
  return store;
}
