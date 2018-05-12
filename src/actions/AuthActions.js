import firebase from 'firebase';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
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
            .then((user) => loginUserSuccess(dispatch, user, navigation))
            .catch((err) => {
                console.log(err);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        const refUsers = firebase.database().ref('/users');
                        const refUser = refUsers.child(`${user.user.uid}`);
                        refUser.child('email').set(`${user.user.email}`);
                        loginUserSuccess(dispatch, user, navigation);
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


const loginUserSuccess = (dispatch, user, navigation) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    navigation.navigate('home', user);
};
