import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slider from 'react-native-slider';

class MinutesSlider extends Component {
    constructor() {
        super();
        this.state = {
            sliderMinutesValue: 0
        };
    }

    render() {
        const { sliderMinutesValue } = this.state;
        return (
            <View
                style = {styles.sliderView}
            >
                <Text>
                    Minutes: {sliderMinutesValue}
                </Text>
                <Slider
                    value = {sliderMinutesValue}
                    maximumValue = {60}
                    step = {15}
                    animateTransitions
                    animationType = {'spring'}
                    onValueChange = {sliderMinutesValue => this.setState({ sliderMinutesValue })}
                    onSlidingComplete = {sliderMinutesValue => this.props.onSlidingComplete(sliderMinutesValue)}
                />
            </View>
        );
    }
}

const styles = {
    sliderView: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'stretch',
        justifyContent: 'center'
    }
};

export default MinutesSlider;
