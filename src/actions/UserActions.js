import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import {
    FETCH_USER_TEAMS,
    USER_JOINS_TEAM,
    USER_CREATES_AND_JOINS_TEAM,
    USER_ADDS_TIME,
    FETCH_USER_TIMES,
    T_AND_C_ACCEPTED,
    T_AND_C_RETRIVED,
    T_AND_C_DELETED,
    DB_IS_T_AND_C
} from './types';

export const fetchUserTeams = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        const refUserTeam = firebase.database().ref(`/users/${currentUser.uid}/team`);
        const onGetUserTeam = refUserTeam
            .on('value', snapshot => {
                dispatch({
                    type: FETCH_USER_TEAMS,
                    payload: snapshot.val()
                });
            });
        //refUserTeam.off('value', onGetUserTeam);
    };
};

export const userJoinsTeam = (teamName) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        const refTeam = firebase.database().ref(`/teams/${teamName}`);
        refTeam.child(currentUser.uid).child('email').set(currentUser.email);
        const refUser = firebase.database().ref(`/users/${currentUser.uid}`);
        refUser.child('team').set(teamName);
        dispatch({
            type: USER_JOINS_TEAM,
            payload: teamName
        });
    };
};

export const userCreatsAndJoinsTeam = (teamName) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        const refTeams = firebase.database().ref('/teams');
        refTeams.child(teamName).child(currentUser.uid).child('email').set(currentUser.email);
        const refUser = firebase.database().ref(`/users/${currentUser.uid}`);
        refUser.child('team').set(teamName);
        dispatch({
            type: USER_CREATES_AND_JOINS_TEAM,
            payload: teamName
        });
    };
};

export const userAddsTime = (selectedDay, sliderHoursValue, sliderMinutesValue, navigation) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        const minsAmount = sliderMinutesValue > 0 ? 1 / (60 / sliderMinutesValue) : 0;
        const hoursAmount = sliderHoursValue + minsAmount;
        const date = new Date().add(-selectedDay).days();
        const dateStr = date.toString('MM-dd-yyyy');

        let timeAtThatDate = 0;
        const refUserTimeAtThatDate = firebase.database().ref(`/times/${currentUser.uid}`);
        const onTimeChange = refUserTimeAtThatDate.child(dateStr)
            .on('value', snapshot => {
                timeAtThatDate = snapshot.val() || 0;
            });
        refUserTimeAtThatDate.off('value', onTimeChange);

        const newTime = timeAtThatDate + hoursAmount;
        refUserTimeAtThatDate.child(dateStr).set(newTime);

        dispatch({
            type: USER_ADDS_TIME
        });

        navigation.navigate('graph');
    };
};

export const fetchUserTimes = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        const refUserTimes = firebase.database().ref(`/times/${currentUser.uid}`);
        const onGetUserTimes = refUserTimes
            .on('value', snapshot => {
                dispatch({
                    type: FETCH_USER_TIMES,
                    payload: snapshot.val()
                });
            });
        //refUserTimes.off('value', onGetUserTimes);
    };
};

//    Terms And Conditions

export const TandCAccepted = () => {
    return (dispatch) => {
        // TODO: should I use async/wait here?
        // TODO: Error handling?
        AsyncStorage.setItem(DB_IS_T_AND_C, 'true', (err) => {
            dispatch({ type: T_AND_C_ACCEPTED });
        });
    };
};

export const fetchTandC = () => {
    return (dispatch) => {
        AsyncStorage.getItem(DB_IS_T_AND_C, (err, result) => {
            // If we fetched null will return false. To indicate that flag is missing.
            const isTandCAccepted = JSON.parse(result) === true;
            dispatch({ type: T_AND_C_RETRIVED, payload: isTandCAccepted });
        });
    };
};

export const deleteTandC = () => {
    return (dispatch) => {
        // TODO: Error handling?
        AsyncStorage.removeItem(DB_IS_T_AND_C, (err) => {
            dispatch({ type: T_AND_C_DELETED });
        });
    };
};
