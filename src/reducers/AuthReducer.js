import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    UPDATE_USER_AVATAR
} from '../actions/types';

const INITIAL_STATE = {
    email: 'one@a.comt',
    password: '123456',
    user: null,
    error: '',
    loading: false,
    avatarType: null
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            const { user, avatarType } = action.payload;
            return { ...state, ...INITIAL_STATE, user, avatarType };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, password: '', loading: false };
        case UPDATE_USER_AVATAR:
            return { ...state, ...INITIAL_STATE, avatarType: action.payload };
        default:
            return state;
    }
};
