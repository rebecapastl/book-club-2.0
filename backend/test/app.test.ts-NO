import { Server } from 'http';
import url from 'url';
import axios from 'axios';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {describe, expect, beforeAll, afterAll, it} from '@jest/globals';

//import app from '../src/app';

//const port = app.get('port') || 8998;

import appFunc from '../src/appFunc';

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve,ms));
}

let app: any;
let port: any;

const getUrl = (pathname?: string): string => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('Feathers application tests (with jest)', () => {
  let server: Server;
  let mongoServer: any;

  //  beforeAll(async done => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODBURI = mongoServer.getUri();
    app = appFunc();
    port = app.get('port') || 8998;
    server = app.listen(port);
    await sleep(3000);
    //    server.once('listening', () => done());
  });

  // afterAll(async done => {
  afterAll(async () => {
    //server.close(done);
    server.close();
    await sleep(3000);
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
