import React, { Component } from 'react';
import { PickerIOS, View } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Content,
    Button,
    H3,
    H1,
    Item,
    Input,
    Icon,
    Spinner,
    Text
} from 'native-base';
import firebase from 'firebase';

import ScreenHeader from './components/screenHeader';
import TeamNameModal from './components/teamNameModal';
import HoursSlider from './components/hoursSlider';
import MinutesSlider from './components/minutesSlider';

import { fetchUserTeams, searchTeamName, userAddsTime } from '../actions';

const PickerItemIOS = PickerIOS.Item;

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
            isSearchedTeamExists: false,
            selectedDay: 0,
            sliderHoursValue: 0,
            sliderMinutesValue: 0,
            teamNameError: ''
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
                typedTeamName,
                teamNameError: ''
            });
        };

        const searchTeamName = () => {
            let { typedTeamName } = this.state;
            typedTeamName = typedTeamName.trim();
            const validationRegex = /^[a-z0-9]+$/gi;
            if (!typedTeamName.match(validationRegex)) {
                this.setState({
                    teamNameError: 'Team name should contain only letters and numbers!'
                });
                return;
            }
            // DB call
            firebase.database().ref('/teams')
                .on('value', snapshot => {
                    const teams = snapshot.val();
                    for (const name in teams) {
                        if (name === typedTeamName) {
                            showModal(true);
                            return;
                        }
                    }
                    showModal(false);
                });
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
                    Doesn't look you are a part of any team
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
                <Text style = {styles.errorTextStyles}>
                    {this.state.teamNameError}
                </Text>
                <TeamNameModal
                    isModalVisible = {this.state.isTeamModalVisible}
                    teamExists = {this.state.isSearchedTeamExists}
                    hideModal = {hideModal}
                    teamName = {this.state.typedTeamName.trim()}
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

    getTimeEnterView() {
        console.log('crash');
        return (
                <View
                    style = {{
                        marginTop: 10
                    }}
                >
                    <H3
                        style = {{
                            alignSelf: 'center'
                        }}
                    >
                        How much Wime have you Tasted
                    </H3>
                    <PickerIOS
                        selectedValue = {this.state.selectedDay}
                        onValueChange = {(dayId) => {
                            this.setState({
                                selectedDay: dayId
                            });
                        }}
                        style = {styles.fishPickerStyles}
                        itemStyle = {styles.fishPickerItemStyles}
                    >
                        <PickerItemIOS
                            key = {0}
                            value = {0}
                            label = {'Today'}
                        />
                        <PickerItemIOS
                            key = {1}
                            value = {1}
                            label = {'Yesterday'}
                        />
                        <PickerItemIOS
                            key = {2}
                            value = {2}
                            label = {'2 days ago'}
                        />
                    </PickerIOS>
                    <H1
                        style = {{
                            alignSelf: 'center',
                            top: -30
                        }}
                    >
                        ?
                    </H1>
                    <HoursSlider
                        onSlidingComplete = {(sliderHoursValue) => {
                            this.setState({ sliderHoursValue });
                        }}
                    />
                    <MinutesSlider
                        onSlidingComplete = {(sliderMinutesValue) => {
                            this.setState({ sliderMinutesValue });
                        }}
                    />
                </View>
        );
    }

    render() {
        console.log('MAIN RENDER');
        const { navigation } = this.props;
        const { openDrawer } = navigation;
        const { selectedDay, sliderHoursValue, sliderMinutesValue } = this.state;
        return (
            <Container>
                <ScreenHeader
                    openDrawer = {openDrawer}
                    title = {SCREEN_NAME}
                />
                <Content>
                    {this.getTeamView()}
                    {this.getTimeEnterView()}
                    <Button
                        primary
                        onPress = {this.props.userAddsTime.bind(this, selectedDay, sliderHoursValue, sliderMinutesValue, navigation)}
                        style = {{
                            alignSelf: 'center'
                        }}
                    >
                        <Text>
                            Add time to selected day
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
    },
    errorTextStyles: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'red',
        textAlign: 'center'
    },
    teamView: {
        margin: 10
    },
    fishPickerStyles: {
        top: -30
    },
    fishPickerItemStyles: {
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 24,
        height: 105
    }
};

const mapStateToProps = ({ user }) => {
    const { team } = user;
    return { team };
};

export default connect(mapStateToProps, { fetchUserTeams, searchTeamName, userAddsTime })(HomeView);
