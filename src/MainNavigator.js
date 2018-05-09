import { createStackNavigator } from 'react-navigation';

import AuthView from './screens/AuthView';
// import Tabs from './TabsNavigator';

// Custom transition code
const MyTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange: [0.8, 1, 1],
    });

    const scaleY = position.interpolate({
        inputRange,
        outputRange: ([0.8, 1, 1]),
    });

    return {
        opacity,
        transform: [
            { scaleY }
        ]
    };
};

const TransitionConfiguration = () => {
    return {
        // Define scene interpolation, eq. custom transition
        screenInterpolator: (sceneProps) => {
            const { position, scene } = sceneProps;
            const { index } = scene;

            return MyTransition(index, position);
        }
    };
};

const routeConfiguration = {
    auth: {
        screen: AuthView
    }
    // tabs: {
    //     screen: Tabs,
    //     navigationOptions: {
    //         // to disable swipe back to AuthView
    //         gesturesEnabled: false
    //         // title: 'Tabs',
    //         // headerLeft: null
    //     }
    // }
};

const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'auth',
    mode: 'card',
    cardStyle: {
        paddingTop: Expo.Constants.statusBarHeight,
        backgroundColor: 'white'
    }
    //transitionConfig: TransitionConfiguration
};

const MainNavigator = createStackNavigator(routeConfiguration, stackNavigatorConfiguration);

export default MainNavigator;
