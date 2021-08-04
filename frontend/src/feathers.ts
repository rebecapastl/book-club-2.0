import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io('https://8080-cs-73368763033-default.cs-us-west1-ijlt.cloudshell.dev/');
const client = feathers();

client.configure(socketio(socket));
client.configure(
  feathers.authentication({
    storage: window.localStorage,
  })
);

export default client;
