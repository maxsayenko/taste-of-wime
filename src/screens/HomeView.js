import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import {
    Container,
    Button,
    Header,
    Left,
    Right,
    Icon,
    Body,
    Title
} from 'native-base';

class HomeView extends Component {
    static navigationOptions = () => ({
        drawerLabel: 'Home'
    });

    render() {
        //const { navigation } = this.props;
        //console.log(navigation.state.params.user);
        return (<Container>
            <Header
                style = {{
                    marginTop: -Expo.Constants.statusBarHeight
                }}
            >
                <Left>
                    <Button
                        transparent
                        onPress = {this.props.navigation.openDrawer.bind(this)}
                    >
                        <Icon name = 'menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Header</Title>
                </Body>
                <Right />
            </Header>
        </Container>);
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
