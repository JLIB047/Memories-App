import React from "react";
import ReactDOM  from "react-dom";
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from "./reducers"

import App from './App';

//implement redux to make the application more scalable 
const store = createStore(reducers, compose(applyMiddleware(thunk)))

//connecting to the div w an Id of root 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);