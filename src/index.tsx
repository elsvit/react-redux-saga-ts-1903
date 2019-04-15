/**
 * @fileOverview
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configApi from 'constants/api';
import configureApi from 'services/api';
import { history, store } from 'store';
import App from './App';
import * as serviceWorker from './serviceWorker';

configureApi(`${configApi.baseURL}${configApi.apiPath}`);

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
