import app from '../../src/app';

describe('\'books\' service', () => {
  it('registered the service', () => {
    const service = app.service('books');
    expect(service).toBeTruthy();
  });
});
