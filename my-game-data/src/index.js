import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import settingReducer from './Store/Reducers/SettingReducer'
import thunk from 'redux-thunk'
import firebase from 'firebase'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers(
    {
        setting:settingReducer,
    }
)

const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

var config = {
    apiKey: "AIzaSyCmFpHcf9wcW49QcbadHjnjFbX3XuVW_3g",
    authDomain: "react-learn-65818.firebaseapp.com",
    databaseURL: "https://react-learn-65818.firebaseio.com",
  };
  
  firebase.initializeApp(config);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
