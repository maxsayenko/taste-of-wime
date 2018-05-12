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
    Segment
} from 'native-base';
import firebase from 'firebase';

import { emailChanged, passwordChanged, loginUser } from '../actions';

class AuthView extends Component {
    render() {
        const { navigation } = this.props;

        return (<Container>
            <Content>
                <Container style = {styles.mainContainer}>
                    <Form style = {styles.form}>
                        <Item floatingLabel = "floatingLabel">
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item
                            floatingLabel = "floatingLabel"
                            style = {{
                                marginTop: 10
                            }}
                        >
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <View>
                            <Button
                                primary = "primary"
                                style = {{
                                    alignSelf: 'center',
                                    marginTop: 10
                                }}
                            >
                                <Text>
                                    Sign In/Up
                                </Text>
                            </Button>
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
