import { applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer  from './reducers';
import setAuthToken from './util/setAuthToken';

const initialState = {};
const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  preloadedState: initialState,
  devTools: true,
  enhancers: [applyMiddleware(...middleware)],
  // enhancers: [composeWithDevTools(applyMiddleware(...middleware))]
});



let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();

  if (previousState.auth.token !== currentState.auth.token) {
    setAuthToken(currentState.auth.token);
  }
});

export default store;