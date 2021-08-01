// import app from '../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import appFunc from '../../src/appFunc';
import {describe, expect, beforeAll, afterAll, it} from '@jest/globals';

describe('\'reviews\' service', () => {
  let mongoServer : any;
  let app : any;
  let user : any;

  const userInfo = {
    email: 'annemarie@xmen.com',
    name:'Anne Marie',
    password: 'roguexmen',
    avatar: 'somestringavatar',
  };

  const userInfoId = {
    email: 'annemarie@xmen.com',
    name:'Anne Marie',
    password: 'roguexmen',
    avatar: 'somestringavatar',
    _id:'somestringid',
  };


  const reviewInfo = {
    text: 'Great book',
    book: 'The Silmarillion',
    bookId: 'somestringbookid',
  };

  const reviewNoBook = {
    text: 'Great book',
    bookId: 'somestringbookid',
  };

  const reviewShort = {
    text: 'Nice',
    book: 'The Silmarillion',
    bookId: 'somestringbookid',
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODBURI = await mongoServer.getUri();
    app = appFunc();
    user = await app.service('users').create(userInfo);
  });

  afterAll(async () => {
    await mongoServer.stop();
  });


  it('registered the service', () => {
    const service = app.service('reviews');
    expect(service).toBeTruthy();
  });

  it('creates correct review', async () => {
    const review = await app.service('reviews').create(reviewInfo, {user:userInfoId});
    expect(review).toBeTruthy();
  });

  it('creates review with no book', async () => {
    await expect( async () => {
      const review = await app.service('review').create(reviewNoBook, {user:userInfoId});
    }).rejects.toThrow();
  });

  it('creates review with no user', async () => {
    await expect( async () => {
      const review = await app.service('review').create(reviewInfo);
    }).rejects.toThrow();
  });

  it('creates short review', async () => {
    await expect( async () => {
      const review = await app.service('review').create(reviewShort, {user:userInfoId});
    }).rejects.toThrow();
  });
});
