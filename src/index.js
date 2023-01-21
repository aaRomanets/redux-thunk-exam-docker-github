import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {reducer} from './reducer/reducer'
import App from './App';

//при создании хранилища store используем thunk
const store = createStore(reducer, applyMiddleware(thunk));

const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(App)

ReactDOM.render(
  //фиксируем хранилище store в провайдере
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);