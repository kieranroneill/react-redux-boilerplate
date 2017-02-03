import { Route } from 'react-router';

import Routes, { onAppEnter } from './Routes';

// Strings.
import strings from '../../config/strings.json';

// Containers.
import App from './containers/App/App';
import ErrorPage from './containers/ErrorPage/ErrorPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';

// ActionCreators.
import { InfoActionCreators } from './action-creators/index';

// Services.
import { InfoService } from './services/index';

// States.
import { InfoState as initialInfoState } from './states/index';

import { getDefaultPropsWithStore } from '../../test/helpers';

/**
 * Gets a map that links a route to it's corresponding component.
 * @param wrapper a mounted route.
 * @return a map that maps a route to a component.
 */
const getRouteMap = wrapper => {
    return wrapper
        .find(Route)
        .reduce((map, route) => {
            const props = route.props();

            map[props.path] = props;

            return map;
        }, {});
};
const mockNextState = {
    location: {
        action: 'POP',
        hash: '',
        key: 'aKey',
        pathname: '/' + strings.routes.HOME, // Default route.
        query: {},
        search: '',
        state: undefined
    },
    params: {},
    routes: []
};

describe('<Routes />', () => {
    beforeEach(function () {
        this.props = getDefaultPropsWithStore();
        this.mockNextState = mockNextState;
        this.wrapper = shallow(<Routes { ...this.props }/>);

        this.dispatchSpy = spy(this.props.store, 'dispatch');
        this.getInfoStub = stub(InfoService, 'getInfo');
        this.replaceStub = stub();
    });

    afterEach(function () {
        delete this.props;
        delete this.mockNextState;
        delete this.wrapper;

        this.dispatchSpy.reset();
        this.getInfoStub.restore();
        this.replaceStub.reset();
    });

    describe('when rendering routes', function() {
        it('should render the correct routes', function() {
            const pathMap = getRouteMap(this.wrapper);

            expect(pathMap['/'].component).to.equal(App);
            expect(pathMap[strings.routes.ERROR].component).to.equal(ErrorPage);
            expect(pathMap['*'].component).to.equal(NotFoundPage);
        });
    });

    describe('when entering the base route', function() {
        it('should redirect to the error page if there is an error getting the server information', function(done) {
            this.getInfoStub.rejects();

            onAppEnter(this.props, this.mockNextState, this.replaceStub, () => {
                assert.calledWith(this.replaceStub, '/' + strings.routes.ERROR);

                done();
            });
        });

        it('should successfully get the server information', function(done) {
            const info = initialInfoState;

            this.getInfoStub.resolves(info);

            onAppEnter(this.props, this.mockNextState, this.replaceStub, error => {
                expect(error).to.be.null;
                assert.called(this.getInfoStub);
                assert.calledWith(this.dispatchSpy, InfoActionCreators.setInfo(info));

                done();
            });
        });
    });
});
