import firebase from 'firebase';
// To extend Date object with useful functions
import datejs from 'datejs';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    UPDATE_USER_AVATAR
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password, navigation }) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                const refUserInfo = firebase.database().ref(`/users/${user.user.uid}`);
                refUserInfo.on('value', snapshot => {
                    const userConfig = snapshot.val();

                    loginUserSuccess(dispatch, user, userConfig.avatarType, navigation);
                });
            })
            .catch((err) => {
                console.log(err);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        const defaultAvatarType = 'set4';
                        const refUsers = firebase.database().ref('/users');
                        let refUser = refUsers.child(`${user.user.uid}`);
                        refUser.child('email').set(`${user.user.email}`);
                        refUser.child('avatarType').set(defaultAvatarType);

                        const todayDate = new Date().toString('MM-dd-yyyy');
                        const refTimes = firebase.database().ref('/times');
                        refUser = refTimes.child(`${user.user.uid}`);
                        refUser.child(todayDate).set(0);

                        loginUserSuccess(dispatch, user, defaultAvatarType, navigation);
                    })
                    .catch((err) => loginUserFail(dispatch, err));
            });
    };
};

const loginUserFail = (dispatch, err) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: err.message
    });
};

const loginUserSuccess = (dispatch, user, avatarType, navigation) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, avatarType }
    });
    navigation.navigate('home', { user, avatarType });
};

export const updateUserAvatar = (currentStyle, navigation) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        const currStyleType = parseInt(currentStyle.replace('set', ''), 10);
        let newStyleType = Math.floor((Math.random() * 4) + 1);
        while (newStyleType === currStyleType) {
            newStyleType = Math.floor((Math.random() * 4) + 1);
        }
        const newAvatarStyle = `set${newStyleType}`;
        const refUserAvatarType = firebase.database().ref(`/users/${currentUser.uid}/avatarType`);
        refUserAvatarType.set(newAvatarStyle);
        dispatch({
            type: UPDATE_USER_AVATAR,
            payload: newAvatarStyle
        });
        navigation.navigate('settings', { currentUser, avatarType: newAvatarStyle });
        navigation.openDrawer();
    };
};
