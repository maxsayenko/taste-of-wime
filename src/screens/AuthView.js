import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { Asset, Font } from 'expo';
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

import AuthTermsAndConditionsModal from './components/AuthTermsAndConditionsModal';

import { emailChanged, passwordChanged, loginUser, deleteTandC, fetchTandC, TandCAccepted } from '../actions';

class AuthView extends Component {
    componentDidMount() {
        this.props.fetchTandC();
        //this.props.deleteTandC();
    }

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
                primary
                onPress = {this.LoginUser.bind(this)}
                style = {{
                    alignSelf: 'center'
                }}
            >
                <Text>
                    Sign In/Up
                </Text>
            </Button>
        );
    }

    render() {
        const { isTandCAccepted, TandCAccepted } = this.props;

        // Make sure we got a chance to fetch this flag.
        if (isTandCAccepted !== true && isTandCAccepted !== false) {
            return (<Spinner color = 'blue' />);
        }

        return (<Container>
            <Container style = {styles.mainContainer}>
                <Form style = {styles.form}>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            onChangeText = {this.EmailChanged.bind(this)}
                            value = {this.props.email}
                        />
                    </Item>
                    <Item
                        floatingLabel
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
                    <View
                        style = {{
                            alignSelf: 'center',
                            marginTop: 10
                        }}
                    >
                        <Text style = {styles.errorTextStyles}>
                            {this.props.error}
                        </Text>
                        {this.renderButton()}
                    </View>
                </Form>
            </Container>
            <AuthTermsAndConditionsModal
                isModalVisible = {!(isTandCAccepted)}
                onAgreePress = {TandCAccepted.bind(this)}
            />
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
    },
    errorTextStyles: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'red',
        textAlign: 'center'
    }
};

const mapStateToProps = ({ auth, user }) => {
    const { email, password, error, loading } = auth;
    const { isTandCAccepted } = user;
    return { email, password, error, loading, isTandCAccepted };
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    deleteTandC,
    fetchTandC,
    TandCAccepted
})(AuthView);
