import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {history, store} from 'store';
import App from './App';

describe('App test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <App history={history}/>
      </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
