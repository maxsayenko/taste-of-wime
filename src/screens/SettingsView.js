import React, { Component } from 'react';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'expo';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
    Container,
    H3,
    Text,
    Button,
    Spinner
} from 'native-base';

import ScreenHeader from './components/screenHeader';

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
            shouldUpdateAvatar: false
        };
    }

    componentDidMount() {
        // AdMobInterstitial.setTestDeviceID('EMULATOR');
        // // ALWAYS USE TEST ID for Admob ads
        // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        // AdMobInterstitial.addEventListener('interstitialDidLoad', () => console.log('interstitialDidLoad'));
        // AdMobInterstitial.addEventListener('interstitialDidFailToLoad', () => console.log('interstitialDidFailToLoad'));
        // AdMobInterstitial.addEventListener('interstitialDidOpen', () => console.log('interstitialDidOpen'));
        // AdMobInterstitial.addEventListener('interstitialDidClose', () => console.log('interstitialDidClose'));
        // AdMobInterstitial.addEventListener('interstitialWillLeaveApplication', () => console.log('interstitialWillLeaveApplication'));

        AdMobRewarded.setTestDeviceID('EMULATOR');
        // ALWAYS USE TEST ID for Admob ads
        AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313');
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

    getButtonText(text) {
        const { adIsLoading } = this.state;
        if (adIsLoading === true) {
            return (<Spinner color = 'gray' />);
        }
        return (<Text>{text}</Text>);
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
            shouldUpdateAvatar: false
        });
        AdMobRewarded.requestAdAsync().then(() => {
            AdMobRewarded.showAd();
        });
    }

    bannerError() {
        console.log('An error');
        return;
    }

    render() {
        const { navigation, avatarType, updateUserAvatar } = this.props;
        const { openDrawer } = navigation;
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
                    <Text>Some content</Text>
                    <Button
                        primary
                        onPress = {updateUserAvatar.bind(this, avatarType, navigation)}
                        style = {{
                            alignSelf: 'center'
                        }}
                    >
                        <Text>
                            Get different avatar style
                        </Text>
                    </Button>
                    <Button
                        disabled = {this.state.adIsLoading}
                        onPress = {this.showRewardedToUpdateAvatar.bind(this)}
                    >
                        {this.getButtonText('Update')}
                    </Button>
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
    mainContainer: {
        height: '100%',
        display: 'flex'
    }
};

const mapStateToProps = ({ user, auth }) => {
    const { avatarType } = auth;
    return { avatarType };
};

export default connect(
    mapStateToProps,
    { updateUserAvatar }
)(SettingsView);
