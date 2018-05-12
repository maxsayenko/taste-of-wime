import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    banana: (state, action) => {
        console.log('* * * * all actions ->', action);
        return 'chom-chom';
    },
    auth: AuthReducer,
    user: UserReducer
});
