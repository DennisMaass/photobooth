import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConnectionHandler {
  private closeCallbacks = new Map();
  private openCallbacks = new Map();
  private sockets = new Map();

  public addSocket(socket) {
    if (!socket.id) {
      socket.id = uuidv4();
    }
    this.sockets.set(socket.id, socket);
  }

  public getSocket(id): any {
    return this.sockets.get(id);
  }

  public removeSocket(socket) {
    this.sockets.delete(socket.id);
  }

  public addOnOpen(socket, callback) {
    this.openCallbacks.set(socket.id, callback);
  }

  public addOnClose(socket, callback) {
    this.closeCallbacks.set(socket.id, callback);
  }

  public notifyOnConnection(socket) {
    const callback = this.openCallbacks.get(socket.id);
    if (callback) {
      callback(socket);
    }
  }

  public notifyOnClose(socket) {
    const callback = this.closeCallbacks.get(socket.id);
    if (callback) {
      callback(socket);
    }
  }
}
