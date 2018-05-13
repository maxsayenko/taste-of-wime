import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Button,
    H3,
    H2,
    Item,
    Input,
    Icon,
    Spinner,
    Text
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

    getTeamView() {
        const { team } = this.props;
        if (team === false) {
            return (<Spinner color = 'blue' />);
        }
        if (team === null) {
            return this.noTeamView();
        }
        return this.withTeamView();
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
        };

        const showModal = (isSearchedTeamExists) => {
            this.setState({
                isTeamModalVisible: true,
                isSearchedTeamExists
            });
        };

        return (
            <View
                style = {styles.teamView}
            >
                <H3
                    style = {{
                        textAlign: 'center'
                    }}
                >
                    Doesn't look you are a part of any team.
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
            </View>
        );
    }

    withTeamView() {
        const { team } = this.props;
        return (
            <View
                style = {styles.teamView}
            >
                <H3>You are a part of team: {team}</H3>
            </View>
        );
    }

    render() {
        const { navigation } = this.props;
        const { openDrawer } = navigation;
        return (
            <Container>
                <ScreenHeader
                    openDrawer = {openDrawer}
                    title = {SCREEN_NAME}
                />
                <Content>
                    <View>
                        {this.getTeamView()}
                    </View>
                    <View>
                        <Text>Some text</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    mainContainer: {
        height: '100%',
        display: 'flex'
    },
    teamView: {
        margin: 10
    }
};

const mapStateToProps = ({ user }) => {
    const { team } = user;
    return { team };
};

export default connect(mapStateToProps, { fetchUserTeams, searchTeamName })(HomeView);
