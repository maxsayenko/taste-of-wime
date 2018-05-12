import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Container, Content, Button } from 'native-base';
import firebase from 'firebase';

import ScreenHeader from './components/screenHeader';

import { fetchUserTeams } from '../actions';

const SCREEN_NAME = 'Home';

class HomeView extends Component {
    static navigationOptions = () => ({
        drawerLabel: SCREEN_NAME
    });

    componentWillMount() {
        this.props.fetchUserTeams();
    }

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
                <Content>
                    <Button
                        primary
                        onPress = {() => {
                            // let ref = firebase.database().ref('/teams')
                            //             .on('value', snapshot => {
                            //                 console.log(snapshot.val());
                            //             });

                            const ref = firebase.database().ref('/teams')
                                .push('Hito1')
                                .then(() => {
                                    console.log(arguments);
                                });
                        }}
                    >
                        <Text>
                            Store
                        </Text>
                    </Button>
                    <Button
                        primary
                        onPress = {() => {
                            // let ref = firebase.database().ref('/teams')
                            //             .on('value', snapshot => {
                            //                 console.log(snapshot.val());
                            //             });

                            const ref = firebase.database().ref('/teams');
                                ref.child('Hito1').child('username').set(1);
                                // .set('Hito2')
                                // .then(() => {
                                //     console.log(arguments);
                                // });
                        }}
                    >
                        <Text>
                            Set
                        </Text>
                    </Button>
                    <Button
                        primary
                        onPress = {() => {
                            const ref = firebase.database().ref('/teams')
                                        .on('value', snapshot => {
                                            const teams = snapshot.val();
                                            for (const key in teams) {
                                                console.log(teams[key]);
                                            }
                                        });
                        }}
                    >
                        <Text>
                            Fetch
                        </Text>
                    </Button>
                </Content>
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

export default connect(mapStateToProps, { fetchUserTeams })(HomeView);
