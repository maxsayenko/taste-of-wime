import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, Button } from 'react-native';
import { Asset, Font, AppLoading } from 'expo';

class AuthView extends Component {
    render() {
        const { navigation } = this.props;
        // const { isTandCAccepted } = this.props;
        //
        // // Make sure we got a chance to fetch this flag.
        // if (isTandCAccepted !== true && isTandCAccepted !== false) {
        //     return (
        //         <AppLoading />
        //     );
        // }

        return (
            <View
                style = {styles.mainContainer}
            >
                <Text>
                    Login View goes here
                </Text>
                <Button
                    onPress = {() => {
                        navigation.navigate('home');
                    }}
                    title = "Learn More"
                    color = "#841584"
                    accessibilityLabel = "Learn more about this purple button"
                />
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
    return state;
};

export default connect(
    mapStateToProps,
    {}
)(AuthView);
