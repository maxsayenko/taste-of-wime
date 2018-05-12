import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import {
    Container
} from 'native-base';

import ScreenHeader from './components/screenHeader';

const SCREEN_NAME = 'Home';

class HomeView extends Component {
    static navigationOptions = () => ({
        drawerLabel: SCREEN_NAME
    });

    render() {
        const { navigation } = this.props;
        const { openDrawer } = navigation;
        //console.log(navigation.state.params.user);
        return (
            <Container>
                <ScreenHeader
                    openDrawer = {openDrawer}
                    title = {SCREEN_NAME}
                />
            </Container>
        );
    }
}

const styles = {
    mainContainer: {
        height: '100%',
        display: 'flex'
    }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, {})(HomeView);
