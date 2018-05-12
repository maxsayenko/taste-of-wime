import React, { Component } from 'react';
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

class TeamNameModal extends Component {
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
                    <Text>
                        {teamName}
                    </Text>
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
}

export default TeamNameModal;
