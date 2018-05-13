import firebase from 'firebase';
import {
    FETCH_USER_TEAMS,
    USER_JOINS_TEAM,
    USER_CREATES_AND_JOINS_TEAM,
    USER_ADDS_TIME
} from './types';

export const fetchUserTeams = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/team`)
            .on('value', snapshot => {
                console.log(snapshot.val());
                dispatch({
                    type: FETCH_USER_TEAMS,
                    payload: snapshot.val()
                });
            });
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
    console.log(navigation);
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
