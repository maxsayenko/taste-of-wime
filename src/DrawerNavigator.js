import React from 'react';
//import { connect } from 'react-redux';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Header, Body } from 'native-base';

import HomeView from './screens/HomeView';
import GraphView from './screens/GraphView';
import SettingsView from './screens/SettingsView';

const CustomDrawerContentComponent = (props) => {
    console.log(props);
    let email = '';
    let avatarType = 'set4';

    try {
        avatarType = props.items[0].params.avatarType;
    } catch (err) {
        console.log('Error retriving user avatar type');
    }

    try {
        email = props.items[0].params.user.user.email;
    } catch (err) {
        console.log('Error retriving user email');
    }

    return (
            <Container>
                <Header style = {styles.drawerHeader}>
                    <Body>
                        {email && <Image
                            style = {styles.drawerImage}
                            source = {{ uri: `https://robohash.org/${email}?set=${avatarType}` }}
                        />}
                    </Body>
                </Header>
                <Content>
                    <DrawerItems {...props} />
                </Content>
            </Container>
        );
};

const routeConfiguration = {
    home: {
        path: '/home',
        screen: HomeView
    },
    graph: {
        path: '/graph',
        screen: GraphView
    },
    settimgs: {
        path: '/settimgs',
        screen: SettingsView
    }
};

const navigatorConfiguration = {
    initialRouteName: 'home',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
        activeTintColor: '#e91e63'
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 200,
        backgroundColor: 'white'
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75
    }
});

const DrawerNavigator = createDrawerNavigator(routeConfiguration, navigatorConfiguration);

export default DrawerNavigator;
// const mapStateToProps = ({ auth }) => {
//     const { user } = auth;
//     return { user };
// };

//export default connect(mapStateToProps)(DrawerNavigator);
