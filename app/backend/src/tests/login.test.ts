import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import userMock from './mocks/user.mock';
import loginMock from './mocks/login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Caso o login dê certo', () => {
  let chaiHttpResponse: Response;

  it('Se o login for feito com sucesso', async () => {
    sinon.stub(User, "findOne").resolves({ ...userMock.validUser } as User);
    sinon.stub(bcrypt, "compare").resolves(true);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(loginMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.haveOwnProperty('token');
  });
});
