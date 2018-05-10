import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button } from 'react-native';

class HomeView extends Component {
    render() {
        return (
            <View
                style = {styles.mainContainer}
            >
                <Text>
                    This is Home View
                </Text>
                <Button
                    onPress = {() => {
                        //navigation.navigate('home');
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
)(HomeView);
