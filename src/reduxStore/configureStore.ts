import { createStore } from 'redux';
import rootReducer from './reducers';

export default function configureStore() {
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__;
    return createStore(
        rootReducer,
        devTools
            ? devTools()
            : (f) => f,
    );
}
