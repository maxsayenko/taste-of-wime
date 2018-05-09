import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class HomeView extends Component {
    render() {
        return (
            <View
                style = {styles.mainContainer}
            >
                <Text>
                    This is Home View
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
    return state;
};

export default connect(
    mapStateToProps,
    {}
)(HomeView);
