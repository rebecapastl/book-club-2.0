// import app from '../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import appFunc from '../src/appFunc';
import {describe, expect, beforeAll, afterAll, it} from '@jest/globals';

describe('authentication', () => {
  let mongoServer : any;
  let app : any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODBURI = await mongoServer.getUri();
    app = appFunc();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  it('registered the authentication service', () => {
    expect(app.service('authentication')).toBeTruthy();
  });

  describe('local strategy', () => {
    const userInfo = {
      email: 'annemarie@xmen.com',
      name:'Anne Marie',
      password: 'roguexmen',
      avatar: 'somestringavatar'
    };

    beforeAll(async () => {
      try {
        await app.service('users').create(userInfo);
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      }, {});

      expect(accessToken).toBeTruthy();
      expect(user).toBeTruthy();
    });
  });
});
