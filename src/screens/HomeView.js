import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import {
    Container,
    Content,
    Button,
    H3,
    Item,
    Input,
    Icon
} from 'native-base';
import firebase from 'firebase';

import ScreenHeader from './components/screenHeader';
import TeamNameModal from './components/teamNameModal';

import { fetchUserTeams, searchTeamName } from '../actions';

const SCREEN_NAME = 'Home';

class HomeView extends Component {
    static navigationOptions = () => ({
        drawerLabel: SCREEN_NAME
    });

    constructor() {
        super();
        this.state = {
            typedTeamName: '',
            isTeamModalVisible: false,
            isSearchedTeamExists: false
        };
    }

    componentWillMount() {
        this.props.fetchUserTeams();
    }

    noTeamView() {
        const updateTeamName = (typedTeamName) => {
            this.setState({
                typedTeamName
            });
        };

        const searchTeamName = () => {
            const { typedTeamName } = this.state;
            if (typedTeamName.length > 0) {
                firebase.database().ref('/teams')
                    .on('value', snapshot => {
                        const teams = snapshot.val();
                        for (const name in teams) {
                            console.log(name);
                            if (name === typedTeamName) {
                                showModal(true);
                                return;
                            }
                        }
                        showModal(false);
                    });
            }
        };

        const hideModal = () => {
            this.setState({ isTeamModalVisible: false });
        }

        const showModal = (isSearchedTeamExists) => {
            this.setState({
                isTeamModalVisible: true,
                isSearchedTeamExists
            });
        }

        return (
            <Container
                style = {{
                    margin: 10
                }}
            >
                <H3>
                    Doesn't look you are a part of the team.
                </H3>
                <Item>
                    <Icon
                        type = 'Ionicons'
                        name = 'ios-people'
                    />
                    <Input
                        placeholder = 'Team name'
                        onChangeText = {updateTeamName.bind(this)}
                    />
                    <Button
                        transparent
                        onPress = {searchTeamName.bind(this)}
                    >
                        <Icon
                            type = 'Octicons'
                            name = 'chevron-right'
                        />
                    </Button>
                </Item>
                <TeamNameModal
                    isModalVisible = {this.state.isTeamModalVisible}
                    teamExists = {this.state.isSearchedTeamExists}
                    hideModal = {hideModal}
                    teamName = {this.state.typedTeamName}
                />
            </Container>
        );
    }

    render() {
        const { navigation, team } = this.props;
        const { openDrawer } = navigation;
        //console.log(navigation.state.params.user);
        return (
            <Container>
                <ScreenHeader
                    openDrawer = {openDrawer}
                    title = {SCREEN_NAME}
                />
                <Content>
                    <Container>
                        {!team && this.noTeamView()}
                    </Container>
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

const mapStateToProps = ({ user }) => {
    const { team } = user;
    return { team };
};

export default connect(mapStateToProps, { fetchUserTeams, searchTeamName })(HomeView);
