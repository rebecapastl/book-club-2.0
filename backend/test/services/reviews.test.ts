// import app from '../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import appFunc from '../../src/appFunc';


describe('\'reviews\' service', () => {
  let mongoServer : any;
  let app : any;
  let user : any;

  const userInfo = {
    email: 'annemarie@xmen.com',
    name:'Anne Marie',
    password: 'roguexmen',
    avatar: 'somestringavatar'
  };

  const reviewInfo = {
    text: 'Great book',
    user: 'Anne Marie',
    book: 'The Silmarillion',
    userId: 'somestringuserid',
    bookId: 'somestringbookid',
  };

  const reviewNoBook = {
    text: 'Great book',
    user: 'Anne Marie',
    userId: 'somestringuserid',
    bookId: 'somestringbookid',
  };

  const reviewNoUser = {
    text: 'Great book',
    book: 'The Silmarillion',
    userId: 'somestringuserid',
    bookId: 'somestringbookid',
  };

  const reviewShort = {
    text: 'Nice',
    user: 'Anne Marie',
    book: 'The Silmarillion',
    userId: 'somestringuserid',
    bookId: 'somestringbookid',
  };

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
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
    const review = await app.service('reviews').create(reviewInfo);
    expect(review).toBeTruthy();
  });

  it('creates review with no book', async () => {
    await expect( async () => {
      const review = await app.service('review').create(reviewNoBook);
    }).rejects.toThrow();
  });

  it('creates review with no user', async () => {
    await expect( async () => {
      const review = await app.service('review').create(reviewNoUser);
    }).rejects.toThrow();
  });

  it('creates short review', async () => {
    await expect( async () => {
      const review = await app.service('review').create(reviewShort);
    }).rejects.toThrow();
  });
});
