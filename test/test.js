var chai = require('chai');
var chaiHttp = require('chai-http');
var utils = require('./testUtil');

var expect = chai.expect;
chai.use(chaiHttp);

const port = utils.normalizePort(process.env.PORT || '3000');
const apiRoot = `http://localhost:${port}`

describe('Test environment', () => {
    it('should be a development environment, to help mock API calls', () => {
        expect(process.env.NODE_ENV).to.equal('development');
    })
})
describe('FlexAPI v0', () => {
    it('should show API documentation', () => {
        chai.request(apiRoot)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.text).to.contain('<h1>FlexTime API (v0)</h1>');
                expect(res).statusCode.to.equal(200);
            })
    })
    it('should 404 on nonexistent routes', () => {
        chai.request(apiRoot)
            .get('/doesnotexist')
            .end((err, res) => {
                expect(res).statusCode.to.equal(404);
            })
    })
    describe('Appointment retrieval', () => {
        it('should retrieve appointments when auth & headers are ok', () => {
            chai.request(apiRoot)
                .post('/irvington/appointments')
                .send({ username: 'flexer', password: 'testing' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res).statusCode.to.equal(200);
                    expect(JSON.stringify(res.text).length).to.be.greaterThan(0);
                })
        })
        it('should fail on bad credentials', () => {
            chai.request(apiRoot)
                .post('/irvington/appointments')
                .send({ username: 'flexer', password: 'wrong' })
                .end((err, res) => {
                    expect(err).to.not.be.null;
                    expect(res).to.be.json;
                    expect(res).statusCode.to.equal(400);
                })
        })
    })
});


