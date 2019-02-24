import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/login.css';
import './css/navBar.css';
import './css/cabinet.css';
import './css/sideBar.css';
import './css/commonStyles.css';
import './css/itemsContainer.css';
import './css/modalForm.css';
import './css/item.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
