var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;
chai.use(chaiHttp);

const port = normalizePort(process.env.PORT || '3000');
const apiRoot = `http://localhost:${port}`

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
})


function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}