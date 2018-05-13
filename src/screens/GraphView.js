import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
    Container,
    Content,
    Button,
    H3,
    H2,
    H1,
    Item,
    Input,
    Icon,
    Spinner,
    Text
} from 'native-base';
// To extend Date object with useful functions
import datejs from 'datejs';

import ScreenHeader from './components/screenHeader';

import { fetchUserTimes } from '../actions';

const SCREEN_NAME = 'Graph';

class GraphView extends Component {
    static navigationOptions = () => ({
        drawerLabel: SCREEN_NAME
    });

    componentWillMount() {
        this.props.fetchUserTimes();
    }

    getMeetingsTimeList() {
        const { meetingsTime } = this.props;
        if (meetingsTime === null) {
            return (<Spinner color = 'blue' />);
        }
        const meetingsTimeArr = [];
        for (const date in meetingsTime) {
            let color = 'green';
            if (meetingsTime[date] > 4) {
                color = 'orange';
            }
            if (meetingsTime[date] > 6) {
                color = 'red';
            }
            meetingsTimeArr.unshift({ date, color, hours: meetingsTime[date] });
        }
        console.log(meetingsTimeArr);
        return (
            <View
                style = {{
                    margin: 20
                }}
            >
                {
                    meetingsTimeArr.map((item) => {
                        return (
                            <View
                                key = {item.date}
                                style = {{
                                    flexDirection: 'row'
                                }}
                            >
                                <H3
                                    style = {{
                                        minWidth: 40
                                    }}
                                >
                                    {Date.parse(item.date).toString('ddd')}
                                </H3>
                                <Text
                                    style = {{
                                        minWidth: 110
                                    }}
                                >
                                    ({item.date}):
                                </Text>
                                <H3
                                    style = {{
                                        marginLeft: 10,
                                        minWidth: 50,
                                        color: item.color
                                    }}
                                >
                                    {item.hours}
                                </H3>
                                <H3>hours</H3>
                            </View>
                        );
                    })
                }
            </View>
        );
    }

    render() {
        const { navigation } = this.props;
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
                {this.getMeetingsTimeList()}
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
    const { meetingsTime } = user;
    return { meetingsTime };
};

export default connect(
    mapStateToProps,
    { fetchUserTimes }
)(GraphView);
