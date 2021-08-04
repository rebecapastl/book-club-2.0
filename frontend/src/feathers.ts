import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io('https://book-club-2tl5upt2lq-uw.a.run.app');
const client = feathers();

client.configure(socketio(socket));
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

export default client;
