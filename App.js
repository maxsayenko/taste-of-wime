import React, { Component } from 'react';
import firebase from 'firebase';

// Redux
import { Provider } from 'react-redux';
import store from './src/configureStore';
import config from './config';

// Navigation
import MainNavigator from './src/MainNavigator';

export default class App extends Component {
    componentWillMount() {
        firebase.initializeApp(config);
    }

    render() {
        const storeInstance = store();
        return (
            <Provider store = {storeInstance}>
                <MainNavigator />
            </Provider>
        );
    }
}
