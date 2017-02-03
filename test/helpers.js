import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// States.
import { InfoState } from '../public/src/states/index';

const mockStore = configureMockStore([thunk]);

/**
 * Returns props that mocks the router and connected components.
 * @return a mocked props object
 */
export function getDefaultProps() {
    const store = {
        info: InfoState
    };

    return {
        dispatch: stub(),
        location: {
            query: {}
        },
        router: {
            push: stub()
        },
        ...store
    };
}

/**
 * Returns props that mocks the router, store and connected components.
 * @return a mocked props object
 */
export function getDefaultPropsWithStore() {
    const store = {
        info: InfoState
    };

    return {
        dispatch: stub(),
        location: {
            query: {}
        },
        router: {
            push: stub()
        },
        store: mockStore(store),
        ...store
    };
}
