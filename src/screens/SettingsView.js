import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
    Container,
    H3,
    Text,
    Button
} from 'native-base';

import ScreenHeader from './components/screenHeader';

import { updateUserAvatar } from '../actions';

const SCREEN_NAME = 'Settings';

class SettingsView extends Component {
    static navigationOptions = () => ({
        drawerLabel: SCREEN_NAME
    });

    render() {
        const { navigation, avatarType, updateUserAvatar } = this.props;
        console.log('crash', avatarType);
        const { openDrawer } = navigation;
        return (
            <Container
                style = {{
                    display: 'flex'
                }}
            >
                <ScreenHeader
                    openDrawer = {openDrawer}
                    title = {SCREEN_NAME}
                />
                <Container>
                    <Text>Some content</Text>
                    <Button
                        primary
                        onPress = {updateUserAvatar.bind(this, avatarType, navigation)}
                        style = {{
                            alignSelf: 'center'
                        }}
                    >
                        <Text>
                            Get different avatar style
                        </Text>
                    </Button>
                </Container>
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

const mapStateToProps = ({ user, auth }) => {
    const { avatarType } = auth;
    return { avatarType };
};

export default connect(
    mapStateToProps,
    { updateUserAvatar }
)(SettingsView);
