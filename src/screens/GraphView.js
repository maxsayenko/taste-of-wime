import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';
import { Container } from 'native-base';

import ScreenHeader from './components/screenHeader';

const SCREEN_NAME = 'Graph';

class GraphView extends Component {
    static navigationOptions = () => ({
        drawerLabel: SCREEN_NAME
    });

    render() {
        const { navigation } = this.props;
        const { openDrawer } = navigation;
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

export default connect(
    mapStateToProps,
    {}
)(GraphView);
