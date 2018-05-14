import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';

export default combineReducers({
    banana: (state, action) => {
        console.log('* * * * all actions ->', action);
        return 'chom-chom';
    },
    auth: AuthReducer
});
