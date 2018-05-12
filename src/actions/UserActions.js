import firebase from 'firebase';
import {
    FETCH_USER_TEAMS,
    USER_JOINS_TEAM,
    USER_CREATES_AND_JOINS_TEAM
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
