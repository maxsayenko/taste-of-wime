import firebase from 'firebase';
import {
    FETCH_USER_TEAMS
} from './types';

export const fetchUserTeams = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/teams`)
            .on('value', snapshot => {
                console.log(snapshot.val());
                dispatch({
                    type: FETCH_USER_TEAMS,
                    payload: snapshot.val()
                });
            });
    };
};
