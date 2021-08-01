// import app from '../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import appFunc from '../../src/appFunc';
import {describe, expect, beforeAll, afterAll, it} from '@jest/globals';

describe('\'users\' service', () => {
  let mongoServer: any;
  let app: any;

  const userInfo = {
    email: 'annemarie@xmen.com',
    name:'Anne Marie',
    password: 'roguexmen',
    avatar: 'somestringavatar'
  };

  const userNoPassword = {
    email: 'remylebeau@xmen.com',
    name:'Remy LeBeau',
    avatar: 'somestringavatar'
  };

  const userNoAvatar = {
    email: 'danimoonstar@newmutants.com',
    name:'Danielle Moonstar',
    password: 'n',
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODBURI = await mongoServer.getUri();
    app = appFunc();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });


  it('registered the service', () => {
    const service = app.service('users');
    expect(service).toBeTruthy();
  });

  it('creates user', async () => {
    const user = await app.service('users').create(userInfo);
    expect(user).toBeTruthy();
  });

  it('creates duplicate user', async () => {
    await expect( async () => {
      const user = await app.service('users').create(userInfo);
    }).rejects.toThrow();
  });

  it('creates user with no avatar', async () => {
    const user = await app.service('users').create(userNoAvatar);
    expect(user).toBeTruthy();
  });


  it('creates user with no password', async () => {
    await expect( async () => {
      const user = await app.service('users').create(userNoPassword);
    }).rejects.toThrow();
  });

});
