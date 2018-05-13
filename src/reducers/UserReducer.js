import {
    FETCH_USER_TEAMS,
    USER_JOINS_TEAM,
    USER_CREATES_AND_JOINS_TEAM,
    FETCH_USER_TIMES,
    T_AND_C_DELETED,
    T_AND_C_ACCEPTED,
    T_AND_C_RETRIVED
} from '../actions/types';

const INITIAL_STATE = {
    team: false,
    meetingsTime: null,
    isTandCAccepted: undefined
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_TEAMS:
            return { ...state, team: action.payload };
        case USER_JOINS_TEAM:
            return { ...state, team: action.payload };
        case USER_CREATES_AND_JOINS_TEAM:
            return { ...state, team: action.payload };
        case FETCH_USER_TIMES:
            return { ...state, meetingsTime: action.payload };

        case T_AND_C_ACCEPTED:
            return { ...INITIAL_STATE, ...state, isTandCAccepted: true };
        case T_AND_C_RETRIVED:
            return { ...INITIAL_STATE, ...state, isTandCAccepted: action.payload };
        case T_AND_C_DELETED:
            return { ...INITIAL_STATE, ...state, isTandCAccepted: undefined };
        default:
            return state;
    }
};
