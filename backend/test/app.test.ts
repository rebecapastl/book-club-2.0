import assert from 'assert';
import { Server } from 'http';
import url from 'url';
import axios from 'axios';
import { MongoMemoryServer } from 'mongodb-memory-server';
import appFunc from '../src/appFunc';
import expectCt from 'helmet/dist/middlewares/expect-ct';

let app : any;
let port : any;


// const port = app.get('port') || 8998;

const getUrl = (pathname?: string): string => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('Feathers application tests (with jest)', () => {
  let server: Server;
  let mongoServer : any;

  beforeAll(async done => {
    mongoServer = new MongoMemoryServer();
    process.env.MONGODBURI = await mongoServer.getUri();
    app = appFunc();
    port = app.get('port') || 8998;
    server = app.listen(port);
    server.once('listening', () => done());
  });

  afterAll(async done => {
    server.close(done);
    await mongoServer.stop();
  });


  it('starts and shows the index page', async () => {
    expect.assertions(1);

    const { data } = await axios.get(getUrl());

    expect(data.indexOf('<html lang="en">')).not.toBe(-1);
  });

  describe('404', () => {
    it('shows a 404 HTML page', async () => {
      expect.assertions(2);

      try {
        await axios.get(getUrl('path/to/nowhere'), {
          headers: {
            'Accept': 'text/html'
          }
        });
      } catch (error) {
        const { response } = error;

        expect(response.status).toBe(404);
        expect(response.data.indexOf('<html>')).not.toBe(-1);
      }
    });

    it('shows a 404 JSON error without stack trace', async () => {
      expect.assertions(4);

      try {
        await axios.get(getUrl('path/to/nowhere'));
      } catch (error) {
        const { response } = error;

        expect(response.status).toBe(404);
        expect(response.data.code).toBe(404);
        expect(response.data.message).toBe('Page not found');
        expect(response.data.name).toBe('NotFound');
      }
    });
  });
});
