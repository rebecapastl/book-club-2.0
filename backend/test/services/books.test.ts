// import app from '../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import appFunc from '../../src/appFunc';
import {describe, expect, beforeAll, afterAll, it} from '@jest/globals';


describe('\'books\' service', () => {
  let mongoServer : any;
  let app : any;
  let user : any;

  const userInfo = {
    email: 'annemarie@xmen.com',
    name:'Anne Marie',
    password: 'roguexmen',
    avatar: 'somestringavatar'
  };

  const userInfoId = {
    email: 'annemarie@xmen.com',
    name:'Anne Marie',
    password: 'roguexmen',
    avatar: 'somestringavatar',
    _id:'somestringid',
  };

  const bookInfo = {
    title: 'The Silmarillion',
    author: 'J. R. R. Tolkien',
    cover: 'somestringcover',
    availability: 'Both',
  };

  const bookNoOwner = {
    title: 'The Silmarillion',
    author: 'J. R. R. Tolkien',
    cover: 'somestringcover',
    availability: 'Both',
  };

  const bookNoTitle = {
    author: 'J. R. R. Tolkien',
    cover: 'somestringcover',
    availability: 'Both',
  };

  const bookNoAuthor = {
    title: 'The Silmarillion',
    cover: 'somestringcover',
    availability: 'Both',
  };

  const bookNoCover = {
    title: 'The Silmarillion',
    author: 'J. R. R. Tolkien',
    availability: 'Both',
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
    const service = app.service('books');
    expect(service).toBeTruthy();
  });

  it('creates correct book', async () => {
    const book = await app.service('books').create(bookInfo, {user:userInfoId});
    expect(book).toBeTruthy();
  });

  it('creates book with no cover', async () => {
    const book = await app.service('books').create(bookNoCover, {user:userInfoId});
    expect(book).toBeTruthy();
  });

  it('creates book without owner', async () => {
    await expect( async () => {
      const book = await app.service('book').create(bookNoOwner);
    }).rejects.toThrow();
  });

  it('creates book with no title', async () => {
    await expect( async () => {
      const book = await app.service('book').create(bookNoTitle, {user:userInfoId});
    }).rejects.toThrow();
  });

  it('creates book with no author', async () => {
    await expect( async () => {
      const book = await app.service('book').create(bookNoAuthor, {user:userInfoId});
    }).rejects.toThrow();
  });

});
