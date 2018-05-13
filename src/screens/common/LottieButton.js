import React, { Component } from 'react';

import { View, TouchableOpacity } from 'react-native';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;

class LottieButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationJson: null,
            progress: 0
        };

        this.animation = null;
        this.startOnLoadAnimationTimeout = null;
    }

    componentDidMount() {
        this.loadAnimation();
    }

    // On Press Handler
    onPress() {
        //this.animation.play(startFrame, endFrame);
        if (this.props.playOnPress) {
            this.playAnimation();
        }

        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    /**
     * Get either just animation or animation wrapped in button. Depending on props.onPress presence.
     * @return {Component} React Component for the animation
     */
    getLottie() {
        const { animationStyle, loop, speed } = this.props;
        const { animationJson, progress } = this.state;
        // Making sure that animationJson loaded
        const lottie = (animationJson && <Lottie
            ref = {animation => {
                this.animation = animation;
            }}
            style = {[styles.lottie, animationStyle]}
            source = {animationJson}
            speed = {speed}
            progress = {progress}
            loop = {loop}
        />);

        if (this.props.onPress) {
            return (
                <TouchableOpacity
                    onPress = {this.onPress.bind(this)}
                >
                    {lottie}
                </TouchableOpacity>
            );
        }

        return lottie;
    }

    /**
     * Need to have this function, so <Lottie> has a chance to load, and call ref function
     * @return {Void}
     */
    loadAnimation() {
        const { animationJson, startProgressFrame, playOnLoadAfter } = this.props;
        this.setState({
            animationJson,
            progress: startProgressFrame
        });

        if (playOnLoadAfter >= 0) {
            const animationDelay = playOnLoadAfter;
            this.startOnLoadAnimationTimeout = setTimeout(this.playAnimation.bind(this), animationDelay);
        }
    }

    playAnimation() {
        const { animationRange } = this.props;

        this.animation.reset();

        if (animationRange && Array.isArray(animationRange)) {
            const startFrame = animationRange[0];
            const endFrame = animationRange[1];
            this.animation.play(startFrame, endFrame);
        } else {
            this.animation.play();
        }
        //this.animation.reset();
    }

    render() {
        return (
            <View
                style = {[styles.animationContainer, this.props.style]}
            >
                {this.getLottie()}
            </View>
        );
    }
}

const styles = {
    animationContainer: {
        overflow: 'hidden'
    },
    lottie: {
        //position: 'relative'
    }
};

export default LottieButton;

LottieButton.defaultProps = {
    startProgressFrame: 0,
    playOnLoadAfter: undefined,
    loop: false,
    speed: 1,
    animationRange: undefined
};

// LottieButton.propTypes = {
//     animationJson: PropTypes.object.isRequired,
//     startProgressFrame: PropTypes.number,
//     speed: PropTypes.number,
//     style: PropTypes.object,
//     playOnLoadAfter: PropTypes.number,
//     animationRange: PropTypes.array,
//     animationStyle: PropTypes.object
// };
