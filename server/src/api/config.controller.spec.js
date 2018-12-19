const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);
let agent;

describe('/api/config', () => {

    before(async () => {
        agent = chai.request.agent(app);
        await agent.post('/api/auth/sigin').send({ login: 'login', pass: 'pass' });
    })

    it('should get config', () => {
        return agent.get('/api/config')
            .then(res => {
                expect(res).has.status(200);
            })
    })

    after((fn) => {
        agent.close(fn);
    })

})
