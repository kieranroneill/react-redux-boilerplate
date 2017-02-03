import headerMiddleware from './header.middleware';

describe('middlewares/header', () => {
    beforeEach(function() {
        this.response = httpMocks.createResponse();

        this.nextSpy = spy();
    });

    afterEach(function() {
        delete this.response;

        this.nextSpy.reset();
    });

    describe('addResponseHeaders()', function() {
        it('should add a new "X-Powered-By" header', function() {
            headerMiddleware.addResponseHeaders({}, this.response, this.nextSpy);

            expect(this.response.getHeader(strings.headers.POWERED_BY)).to.equal(strings.APP_TITLE);

            assert.calledWith(this.nextSpy);
        });
    });

    describe('addStaticResponseHeaders()', function() {
        it('should add a new "X-Powered-By" header', function() {
            headerMiddleware.addStaticResponseHeaders(this.response);

            expect(this.response.getHeader(strings.headers.POWERED_BY)).to.equal(strings.APP_TITLE);
        });
    });
});
