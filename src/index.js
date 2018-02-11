import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './store/reducer';

const store = createStore(reducer, applyMiddleware(thunk));

const app = (
  <Provider store = {store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
