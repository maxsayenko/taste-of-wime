import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import Modal from 'react-native-modal';
import {
    Button,
    Text
} from 'native-base';

const BORDER_RADIUS = 10;

const TermsAndConditionsHTML = require('./TermsAndConditionsHTML.html');

class AuthTermsAndConditionsModal extends Component {
    render() {
        const { isModalVisible, onAgreePress } = this.props;
        return (
            <Modal
                isVisible = {isModalVisible}
            >
                <View
                    style = {styles.modal}
                >
                    <Text
                        style = {styles.introTextStyle}
                    >
                        Please review our Terms and Conditions:
                    </Text>
                    <WebView
                        style = {styles.webViewStyle}
                        source = {TermsAndConditionsHTML}
                    />
                    <Button
                        primary
                        onPress = {onAgreePress}
                        style = {{
                            alignSelf: 'center'
                        }}
                    >
                        <Text>
                            Accept
                        </Text>
                    </Button>
                </View>
            </Modal>
        );
    }
}

const styles = {
    modal: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: BORDER_RADIUS,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5
    },
    introTextStyle: {
        fontSize: 18,
        marginTop: 5,
        textAlign: 'center'
    },
    webViewStyle: {
        marginTop: 5,
        marginBottom: 10
    }
};

export default AuthTermsAndConditionsModal;

// AuthTermsAndConditionsModal.propTypes = {
//     isModalVisible: PropTypes.bool.isRequired,
//     onAgreePress: PropTypes.func.isRequired
// };
