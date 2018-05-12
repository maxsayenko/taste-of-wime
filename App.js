import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        // Disabling Console.Logs from navigator by onNavigationStateChange = {null}
        <Provider store = {storeInstance}>
            <MainNavigator />
        </Provider>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
