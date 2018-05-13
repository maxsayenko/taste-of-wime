import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
    Container,
    Button,
    H3,
    Text
} from 'native-base';

import { userJoinsTeam, userCreatsAndJoinsTeam } from '../../actions';

class TeamNameModal extends Component {
    renderBody(teamExists, teamName) {
        if (teamExists) {
            return (
                <Container>
                    <Text>Team <H3>{teamName}</H3> already exists. Would you like to join?</Text>
                    <Button
                        primary
                        onPress = {this.props.userJoinsTeam.bind(this, teamName)}
                        style = {styles.button}
                    >
                        <Text>
                            Join the team
                        </Text>
                    </Button>
                </Container>
            );
        }

        return (
            <Container>
                <Text>Team <H3>{teamName}</H3> doesn't exist. Would you like to creat it and join?</Text>
                <Button
                    primary
                    onPress = {this.props.userCreatsAndJoinsTeam.bind(this, teamName)}
                    style = {styles.button}
                >
                    <Text>
                        Create and Join
                    </Text>
                </Button>
            </Container>
        );
    }

    render() {
        const { isModalVisible, hideModal, teamExists, teamName } = this.props;
        return (
            <Modal
                isVisible = {isModalVisible}
                onBackdropPress = {hideModal}
                animationIn = 'lightSpeedIn'
                animationOut = 'lightSpeedOut'
            >
                <Container
                    style = {styles.modal}
                >
                    {this.renderBody(teamExists, teamName)}
                </Container>
            </Modal>
        );
    }
}

const styles = {
    modal: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        width: '100%',
        maxHeight: '25%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5
    },
    button: {
        alignSelf: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0
    }
};

export default connect(null, { userJoinsTeam, userCreatsAndJoinsTeam })(TeamNameModal);
