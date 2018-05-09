import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import store from './src/configureStore';

// Navigation
import MainNavigator from './src/MainNavigator';

export default class App extends Component {
    render() {
        const storeInstance = store();
        return (
            // Disabling Console.Logs from navigator by onNavigationStateChange = {null}
            <Provider store = {storeInstance}>
                <MainNavigator
                    // onNavigationStateChange = {(prevState, currentState) => {
                    //     const currentScreen = getCurrentRouteName(currentState);
                    //     const prevScreen = getCurrentRouteName(prevState);
                    //     if (currentScreen === 'Enter') {
                    //         storeInstance.dispatch(enterScreenSelected());
                    //     } else if (currentScreen === 'Graph') {
                    //         storeInstance.dispatch(graphScreenSelected());
                    //     } else if (currentScreen === 'Tweaks') {
                    //         storeInstance.dispatch(tweaksScreenSelected());
                    //     }
                    // 
                    //     console.log('SCREEN LOG', prevScreen, currentScreen);
                    //     // if (prevScreen !== currentScreen) {
                    //     //     // the line below uses the Google Analytics tracker
                    //     //     // change the tracker here to use other Mobile analytics SDK.
                    //     //     tracker.trackScreenView(currentScreen);
                    //     // }
                    // }}
                />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
