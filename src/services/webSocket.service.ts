import WebSocket, { WebSocketServer } from 'ws';
import { GameService } from './game.service';
import { container } from 'tsyringe';
import { GameStatus } from '@prisma/client';

let wss: WebSocketServer | undefined;

export function startWebSocketServer(): void {
  wss = new WebSocketServer({ port: 8080 });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New client connected');
    const gameService = container.resolve(GameService);

    gameService.getGames(GameStatus.ONGOING).then((game) => {
      if (game) {
        ws.send(JSON.stringify({ game: game[0] }));
      } else {
        gameService.getGames(GameStatus.FINISHED).then((games) => {
          ws.send(JSON.stringify({ game: games[games.length - 1] }));
        });
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server is running on ws://localhost:8080');
}

export function broadcast(data: any): void {
  console.log('broadcast');
  if (!wss) return;
  const payload = JSON.stringify({ game: data });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}
