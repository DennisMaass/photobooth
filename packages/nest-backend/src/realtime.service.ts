import { Injectable } from '@nestjs/common';
import { TemplatedApp, WebSocket } from 'uWebSockets.js';
import { ConnectionHandler } from './ConnectionHandler';

type Message = {
  event: string;
  data: any;
};
@Injectable()
export class RealtimeService {
  public server: TemplatedApp = null;

  constructor(private readonly connectionHandler: ConnectionHandler) {}

  public notify(socketId: string, message: Message): void {
    const socket = this.connectionHandler.getSocket(socketId);
    if (!socket) {
      return;
    }
    socket.send(message);
  }

  public notifyAllInSession(id: string, message: Message): void {
    this.server.publish(id, JSON.stringify(message));
  }

  public notifyMe(socket: WebSocket<any>, message: Message) {
    socket.send(JSON.stringify(message));
  }

  public notifyOthersInSession(
    socket: WebSocket<any>,
    sessionId: string,
    message: Message,
  ): void {
    this.notifyAllInSession(sessionId, message);
  }
}
