import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { Asset, Font, AppLoading } from 'expo';

class AuthView extends Component {
    render() {
        const { isTandCAccepted } = this.props;

        // Make sure we got a chance to fetch this flag.
        if (isTandCAccepted !== true && isTandCAccepted !== false) {
            return (
                <AppLoading />
            );
        }

        return (
            <View 
                style = {styles.mainContainer}
            >
                <Text>
                    Login View goes here
                </Text>
            </View>
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
};

export default connect(
    mapStateToProps,
    {}
)(AuthView);