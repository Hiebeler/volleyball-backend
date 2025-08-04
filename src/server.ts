import 'reflect-metadata';
import app from './app';
import { startWebSocketServer } from './services/webSocket.service';

startWebSocketServer();

app.listen(3000, () => {
  console.log('App listening on Port 3000');
});
