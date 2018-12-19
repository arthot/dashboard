const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);
let agent;

describe('/api/auth', () => {

    before(() => {
        agent = chai.request.agent(app);
    })

    it('should not login with wrong user', () => {
        return agent.post('/api/auth/sigin')
            .send({
                login: 'login-invalid',
                pass: 'pass',
            })
            .then(res => {
                expect(res).has.status(401);
            })
    })

    it('should not login with wrong pass', () => {
        return agent.post('/api/auth/sigin')
            .send({
                login: 'login',
                pass: 'pass-invalid',
            })
            .then(res => {
                expect(res).has.status(401);
            })
    })

    it('should login', () => {
        return agent.post('/api/auth/sigin')
            .send({
                login: 'login',
                pass: 'pass',
            })
            .then(res => {
                expect(res).has.status(200);
                expect(res.body.token).is.not.empty;
                expect(res).to.have.cookie('jwt');
            })
    })

    after((fn) => {
        agent.close(fn);
    })

})
