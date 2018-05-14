import React, { Component } from 'react';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'expo';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
    Container,
    H3,
    Text,
    Button,
    Icon,
    Spinner,
    Thumbnail
} from 'native-base';

import LottieButton from './common/LottieButton';
import ScreenHeader from './components/screenHeader';

import { settingsAnimation } from './../../assets/animations';
import { AdMobConfig } from '../../config';

import { updateUserAvatar } from '../actions';

const SCREEN_NAME = 'Settings';

class SettingsView extends Component {
    static navigationOptions = () => ({
        drawerLabel: SCREEN_NAME
    });

    constructor() {
        super();
        this.state = {
            adIsLoading: false,
            shouldUpdateAvatar: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        const adMobUnitId = AdMobConfig.AdUnitID || 'ca-app-pub-3940256099942544/1712485313';
        //const adMobUnitId = 'ca-app-pub-3940256099942544/1712485313';

        AdMobRewarded.setTestDeviceID('EMULATOR');
        // ALWAYS USE TEST ID for Admob ads
        //AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313');
        AdMobRewarded.setAdUnitID(adMobUnitId);
        AdMobRewarded.addEventListener('rewardedVideoDidRewardUser', () => {
            console.log('rewardedVideoDidRewardUser');
            this.setState({
                shouldUpdateAvatar: true
            });
        });
        AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => console.log('rewardedVideoDidLoad'));
        AdMobRewarded.addEventListener('rewardedVideoDidFailToLoad', () => {
            console.log('rewardedVideoDidFailToLoad');
            this.setState({
                shouldUpdateAvatar: false,
                adIsLoading: false
            });
        });
        AdMobRewarded.addEventListener('rewardedVideoDidOpen', () => console.log('rewardedVideoDidOpen'));
        AdMobRewarded.addEventListener('rewardedVideoDidClose', this.avatarVideoClosed.bind(this));
        AdMobRewarded.addEventListener('rewardedVideoWillLeaveApplication', () => console.log('rewardedVideoWillLeaveApplication'));
    }

    componentWillUnmount() {
        AdMobRewarded.removeAllListeners();
    }

    getUpdateAvatarButton() {
        const { adIsLoading } = this.state;

        if (adIsLoading === true) {
            return (
                <Button
                    disabled
                    style = {{ ...styles.updateAvatarButton, minWidth: 100, alignSelf: 'center' }}
                >
                    <Spinner
                        color = 'gray'
                        style = {{
                            marginLeft: 30
                        }}
                    />
                </Button>
            );
        }
        return (
            <Button
                iconLeft
                style = {styles.updateAvatarButton}
                onPress = {this.showRewardedToUpdateAvatar.bind(this)}
            >
                <Icon
                    type = 'Entypo'
                    name = 'video'
                />
                <Text>Update</Text>
            </Button>
        );
    }

    avatarVideoClosed() {
        const { navigation, avatarType, updateUserAvatar } = this.props;
        const { shouldUpdateAvatar } = this.state;
        this.setState({
            adIsLoading: false
        });

        if (shouldUpdateAvatar) {
            this.setState({
                shouldUpdateAvatar: false
            });
            updateUserAvatar(avatarType, navigation);
        }
    }

    showRewardedToUpdateAvatar() {
        // first - load ads and only then - show
        this.setState({
            adIsLoading: true,
            shouldUpdateAvatar: false,
            errorMessage: ''
        });
        AdMobRewarded.requestAdAsync().then(() => {
            AdMobRewarded.showAd();
        }).catch((err) => {
            // Allow change even when ad fails
            this.setState({
                errorMessage: 'Add failed to load. Your avatar will still be updated',
                shouldUpdateAvatar: true
            }, this.avatarVideoClosed);
        });
    }

    // bannerError() {
    //     console.log('An error');
    //     return;
    // }

    render() {
        const { navigation, email, team, avatarType } = this.props;
        const { openDrawer } = navigation;
        const { errorMessage } = this.state;
        return (
            <Container
                style = {{
                    display: 'flex'
                }}
            >
                <ScreenHeader
                    openDrawer = {openDrawer}
                    title = {SCREEN_NAME}
                />
                <Container>
                    <View
                        style = {styles.rowView}
                    >
                        <H3
                            style = {styles.label}
                        >
                            Email:
                        </H3>
                        <H3
                            style = {styles.value}
                        >
                            {email}
                        </H3>
                    </View>
                    <View
                        style = {styles.rowView}
                    >
                        <H3
                            style = {styles.label}
                        >
                            Team:
                        </H3>
                        <H3
                            style = {styles.value}
                        >
                            {team}
                        </H3>
                    </View>
                    <View
                        style = {styles.rowView}
                    >
                        <H3
                            style = {styles.label}
                        >
                            Avatar:
                        </H3>
                        <Thumbnail
                            style = {{ ...styles.value, top: -20 }}
                            source = {{ uri: `https://robohash.org/${email}?set=${avatarType}` }}
                        />
                    </View>
                    <View
                        style = {styles.rowView}
                    >
                        <Text
                            style = {{
                                width: '50%'
                            }}
                        >
                            You can update style of your avatar by watching a quick video:
                        </Text>
                        {this.getUpdateAvatarButton()}
                    </View>
                    <Text style = {styles.errorTextStyles}>
                        {errorMessage}
                    </Text>
                    <LottieButton
                        loop
                        animationJson = {settingsAnimation}
                        playOnLoadAfter = {100}
                        style = {styles.animationIconStyle}
                        animationStyle = {styles.animationLottieStyle}
                    />
                </Container>
            </Container>
        );
    }
}

// Bottom Banner
// <AdMobBanner
//     style = {styles.bottomBanner}
//     bannerSize = "fullBanner"
//     adUnitID = "ca-app-pub-3940256099942544/6300978111"
//     // Test ID, Replace with your-admob-unit-id
//     testDeviceID = "EMULATOR"
//     didFailToReceiveAdWithError = {this.bannerError}
// />

const styles = {
    rowView: {
        flexDirection: 'row',
        margin: 10
    },
    label: {

    },
    updateAvatarButton: {
        position: 'absolute',
        right: 0
    },
    value: {
        position: 'absolute',
        right: 0
    },
    mainContainer: {
        height: '100%',
        display: 'flex'
    },
    errorTextStyles: {
        alignSelf: 'center',
        fontSize: 20,
        color: 'red',
        textAlign: 'center'
    },
    animationIconStyle: {
        flex: 1,
        // remove width and height to override fixed static size
        width: null,
        height: null
    },
    animationLottieStyle: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }
};

const mapStateToProps = ({ user, auth }) => {
    const { avatarType } = auth;
    const { team } = user;
    return { avatarType, team, email: auth.user.user.email };
};

export default connect(
    mapStateToProps,
    { updateUserAvatar }
)(SettingsView);
