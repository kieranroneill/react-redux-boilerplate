import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import configureStore from './store';
import Routes from './Routes';

// Load CSS/SASS.
import './stylesheets/index.scss';

const store = configureStore();

ReactDom.render(
    <Provider store={ store }>
        <Routes
            history={ browserHistory }
            store={ store } />
    </Provider>,
    document.getElementById('root')
);
