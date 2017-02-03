import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';

// ActionCreators.
import { InfoActionCreators } from './action-creators/index';

// Components.
import App from './containers/App/App';
import ErrorPage from './containers/ErrorPage/ErrorPage';
import HomePage from './containers/HomePage/HomePage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';

// Strings.
import strings from '../../config/strings.json';

// Services.
import { InfoService } from './services/index';

export function onAppEnter(props, nextState, replaceState, callback) {
    // Get app dependencies.
    return InfoService
        .getInfo()
        .then(result => {
            props.store.dispatch(InfoActionCreators.setInfo(result));

            callback(null);
        })
        .catch(error => {
            // Redirect to the error page.
            replaceState('/' + strings.routes.ERROR);

            // Callback for testing.
            callback(error);
        });
}

export default function Routes(props) {
    return (
        <Router { ...props }>
            <Route
                path="/"
                component={ App }
                onEnter={ onAppEnter.bind(this, props) } >
                <IndexRoute
                    component={ HomePage } />
            </Route>
            <Route
                path={ strings.routes.ERROR }
                component={ ErrorPage } />
            <Route
                path="*"
                component={ NotFoundPage } />
        </Router>
    );
}
