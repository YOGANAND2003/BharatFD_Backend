const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const FAQ = require('../models/FAQ');

chai.use(chaiHttp);
const { expect } = chai;

describe('FAQ API', () => {
    beforeEach(async () => {
        await FAQ.deleteMany({});
    });

    it('should create a new FAQ', async () => {
        const res = await chai.request(server)
            .post('/api/faqs')
            .send({ question: 'What is Node.js?', answer: 'Node.js is a runtime environment.' });
        expect(res.status).to.equal(201);
        expect(res.body.question).to.equal('What is Node.js?');
    });

    it('should fetch FAQs in English', async () => {
        await FAQ.create({ question: 'What is Node.js?', answer: 'Node.js is a runtime environment.' });
        const res = await chai.request(server).get('/api/faqs');
        expect(res.status).to.equal(200);
        expect(res.body[0].question).to.equal('What is Node.js?');
    });

    it('should fetch FAQs in Hindi', async () => {
        await FAQ.create({ question: 'What is Node.js?', answer: 'Node.js is a runtime environment.', question_hi: 'Node.js क्या है?', answer_hi: 'Node.js एक रनटाइम वातावरण है।' });
        const res = await chai.request(server).get('/api/faqs?lang=hi');
        expect(res.status).to.equal(200);
        expect(res.body[0].question).to.equal('Node.js क्या है?');
    });
});