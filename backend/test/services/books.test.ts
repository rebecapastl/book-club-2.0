// import app from '../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import appFunc from '../../src/appFunc';


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

  const bookInfo = {
    title: 'The Silmarillion',
    author: 'J. R. R. Tolkien',
    cover: 'somestringcover',
    availability: 'Both',
    owner: 'Anne Marie Rogue',
    ownerId: 'somestringownerid',
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
    owner: 'Anne Marie Rogue',
    ownerId: 'somestringownerid',
  };

  const bookNoAuthor = {
    title: 'The Silmarillion',
    cover: 'somestringcover',
    availability: 'Both',
    owner: 'Anne Marie Rogue',
    ownerId: 'somestringownerid',
  };

  const bookNoCover = {
    title: 'The Silmarillion',
    author: 'J. R. R. Tolkien',
    availability: 'Both',
    owner: 'Anne Marie Rogue',
    ownerId: 'somestringownerid',
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
    const service = app.service('books');
    expect(service).toBeTruthy();
  });

  it('creates correct book', async () => {
    const book = await app.service('books').create(bookInfo);
    expect(book).toBeTruthy();
  });

  it('creates book with no cover', async () => {
    const book = await app.service('books').create(bookNoCover);
    expect(book).toBeTruthy();
  });

  it('creates book without owner', async () => {
    await expect( async () => {
      const book = await app.service('book').create(bookNoOwner);
    }).rejects.toThrow();
  });

  it('creates book with no title', async () => {
    await expect( async () => {
      const book = await app.service('book').create(bookNoTitle);
    }).rejects.toThrow();
  });

  it('creates book with no author', async () => {
    await expect( async () => {
      const book = await app.service('book').create(bookNoAuthor);
    }).rejects.toThrow();
  });

});
