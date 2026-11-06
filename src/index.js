import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import App from './app/App';
import store from './redux/store/initStore';
import * as serviceWorker from './serviceWorker';
import { captureInitialQueryParams } from './utility';

// Capture initial query parameters immediately on app load
// This must happen before React Router initializes, as Salesforce may
// rewrite the iframe URL and remove query parameters shortly after load
captureInitialQueryParams();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
