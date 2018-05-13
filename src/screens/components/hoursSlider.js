import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slider from 'react-native-slider';

class HoursSlider extends Component {
    constructor() {
        super();
        this.state = {
            sliderHoursValue: 0
        };
    }

    render() {
        const { sliderHoursValue } = this.state;
        return (
            <View
                style = {styles.sliderView}
            >
                <Text>
                    Hours: {sliderHoursValue}
                </Text>
                <Slider
                    value = {sliderHoursValue}
                    maximumValue = {12}
                    step = {1}
                    animateTransitions
                    animationType = {'spring'}
                    onValueChange = {sliderHoursValue => this.setState({ sliderHoursValue })}
                    onSlidingComplete = {sliderHoursValue => this.props.onSlidingComplete(sliderHoursValue)}
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

export default HoursSlider;
