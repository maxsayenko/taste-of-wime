import {
    FETCH_USER_TEAMS
} from '../actions/types';

const INITIAL_STATE = {
    team: null,
    meetingsTime: null
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_TEAMS:
            return { ...state, team: action.payload };
        default:
            return state;
    }
};
