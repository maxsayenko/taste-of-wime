import {
    FETCH_USER_TEAMS,
    USER_JOINS_TEAM,
    USER_CREATES_AND_JOINS_TEAM
} from '../actions/types';

const INITIAL_STATE = {
    team: false,
    meetingsTime: null
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_TEAMS:
            return { ...state, team: action.payload };
        case USER_JOINS_TEAM:
            return { ...state, team: action.payload };
        case USER_CREATES_AND_JOINS_TEAM:
            return { ...state, team: action.payload };
        default:
            return state;
    }
};
