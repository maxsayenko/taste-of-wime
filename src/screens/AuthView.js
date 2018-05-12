import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { Asset, Font, AppLoading } from 'expo';
import {
    Container,
    Content,
    Text,
    Form,
    Item,
    Label,
    Input,
    Button,
    Spinner
} from 'native-base';
import firebase from 'firebase';

import { emailChanged, passwordChanged, loginUser } from '../actions';

class AuthView extends Component {
    EmailChanged(text) {
        this.props.emailChanged(text);
    }

    PasswordChanged(text) {
        this.props.passwordChanged(text);
    }

    LoginUser() {
        const { email, password, navigation } = this.props;
        this.props.loginUser({ email, password, navigation });
    }

    renderButton() {
        if (this.props.loading === true) {
            return (<Spinner color = 'blue' />);
        }

        return (
            <Button
                primary = "primary"
                style = {{
                    alignSelf: 'center',
                    marginTop: 10
                }}
                onPress = {this.LoginUser.bind(this)}
            >
                <Text>
                    Sign In/Up
                </Text>
            </Button>
        );
    }

    render() {
        return (<Container>
            <Content>
                <Container style = {styles.mainContainer}>
                    <Form style = {styles.form}>
                        <Item floatingLabel = "floatingLabel">
                            <Label>Email</Label>
                            <Input
                                onChangeText = {this.EmailChanged.bind(this)}
                                value = {this.props.email}
                            />
                        </Item>
                        <Item
                            floatingLabel = "floatingLabel"
                            style = {{
                                marginTop: 10
                            }}
                        >
                            <Label>Password</Label>
                            <Input
                                onChangeText = {this.PasswordChanged.bind(this)}
                                value = {this.props.password}
                            />
                        </Item>
                        <View>
                            {this.renderButton()}
                        </View>
                    </Form>
                </Container>
            </Content>
        </Container>);
    }
}

const styles = {
    mainContainer: {
        // justifyContent: 'center',
        // alignItems: 'center'
        height: '100%',
        display: 'flex'
    },
    form: {
        marginTop: '30%'
    },
    repeatPwdInput: {
        display: '1'
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(AuthView);
