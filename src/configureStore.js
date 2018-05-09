import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';

export default function configureStore() {
    const initialState = {};
    const store = createStore(reducers, initialState, applyMiddleware(ReduxThunk));

    if (module.hot) {
        module.hot.accept(() => {

        });
    }

    return store;
}
