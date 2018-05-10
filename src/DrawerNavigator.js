import { createDrawerNavigator } from 'react-navigation';
import HomeView from './screens/HomeView';
import GraphView from './screens/GraphView';

const routeConfiguration = {
    home: {
        path: '/home',
        screen: HomeView
    },
    graph: {
        path: '/graph',
        screen: GraphView
    }
};

const navigatorConfiguration = {
    initialRouteName: 'home',
    contentOptions: {
      activeTintColor: '#e91e63',
    }
};

const DrawerNavigator = createDrawerNavigator(routeConfiguration, navigatorConfiguration);

export default DrawerNavigator;
