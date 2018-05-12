import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
    Container,
    Content,
    Button,
    H3,
    Item,
    Input,
    Icon,
    Text
} from 'native-base';

import { userJoinsTeam } from '../../actions';

class TeamNameModal extends Component {
    renderBody(teamExists, teamName) {
        if (teamExists) {
            return (
                <Container>
                    <Text>Team {teamName} already exists. Would you like to join?</Text>
                    <Button
                        primary
                        onPress = {this.props.userJoinsTeam.bind(this, teamName)}
                        style = {{
                            alignSelf: 'center'
                        }}
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
                <Text>Team {teamName} doesn't exist. Would you like to creat it and join?</Text>
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
        width: '100%',
        maxHeight: '40%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5
    }
};

export default connect(null, { userJoinsTeam })(TeamNameModal);
