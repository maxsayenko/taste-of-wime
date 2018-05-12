import React, { Component } from 'react';
import {
    Button,
    Header,
    Left,
    Right,
    Icon,
    Body,
    Title
} from 'native-base';

class ScreenHeader extends Component {
    render() {
        return (
            <Header
                style = {{
                    marginTop: -Expo.Constants.statusBarHeight
                }}
            >
                <Left>
                    <Button
                        transparent
                        onPress = {this.props.openDrawer.bind(this)}
                    >
                        <Icon name = 'menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}

export default ScreenHeader;
