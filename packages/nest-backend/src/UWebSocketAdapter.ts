import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { SSLApp, App, us_listen_socket_close } from 'uWebSockets.js';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';
import * as events from 'events';
import { destr } from "destr";
import { ConnectionHandler } from './ConnectionHandler.js';

import type { TemplatedApp, us_listen_socket } from 'uWebSockets.js';


type SocketEvent = {
  event: string;
  data: any;
};

type ICreateServerArgs = {
  port: number;
};

type ICreateServerSecureArgs = {
  sslKey: string;
  sslCert: string;
} & ICreateServerArgs;

export class UWebSocketAdapter
  implements WebSocketAdapter<TemplatedApp, any, any>
{
  private instance: TemplatedApp = null;
  private listenSocket: us_listen_socket = null;
  private port: number;
  protected httpServer: any;
  private callbacks = [];

  private connectionHandler: ConnectionHandler;

  constructor(
    private app: INestApplicationContext,
    args?: ICreateServerSecureArgs,
  ) {
    this.port = args.port;
    if (args.sslKey) {
      this.instance = UWebSocketAdapter.buildSSLApp(
        args as ICreateServerSecureArgs,
      );
    } else {
      this.instance = UWebSocketAdapter.buildApp(args);
    }
    app
      .resolve<ConnectionHandler>(ConnectionHandler)
      .then((connectionHandler) => {
        this.connectionHandler = connectionHandler;
      });

    this.instance
      .ws('/*', {
        close: (socket, code, message) => {
          this.connectionHandler.notifyOnClose(socket);
        },
        open: (socket) => {
          Object.defineProperty(socket, 'emitter', {
            configurable: false,
            value: new events.EventEmitter(),
          });
          this.callbacks.forEach((callback) => callback(socket));

          this.connectionHandler.addSocket(socket);
        },
        message: (socket, message, isBinary) => {
          socket['emitter'].emit('message', { message, isBinary });
        },
      })
      .any('/*', (res, req) => {
        res.end('Nothing to see here!');
      });
  }
  static buildSSLApp(params: ICreateServerSecureArgs): TemplatedApp {
    return SSLApp({
      cert_file_name: params.sslCert,
      key_file_name: params.sslKey,
    });
  }

  static buildApp(params: ICreateServerArgs): TemplatedApp {
    return App();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bindClientConnect(server: TemplatedApp, callback: Function): any {
    this.callbacks.push(callback);
  }

  bindMessageHandlers(
    client: any,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): any {
    fromEvent(client['emitter'], 'message')
      .pipe(
        mergeMap((data: { message: ArrayBuffer; isBinary: boolean }) =>
          this.bindMessageHandler(data, handlers, process),
        ),
        filter((result) => result),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    buffer: { message: ArrayBuffer; isBinary: boolean },
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    const stringMessageData = Buffer.from(buffer.message).toString('utf-8');
    const message = destr<SocketEvent>(stringMessageData);
    const messageHandler = handlers.find(
      (handler) => handler.message === message.event,
    );
    if (!messageHandler) {
      return EMPTY;
    }

    return process(messageHandler.callback(message.data));
  }

  close(): any {
    us_listen_socket_close(this.listenSocket);
    this.instance = null;
  }

  create(): TemplatedApp {
    if (!this.listenSocket) {
      this.instance.listen(this.port, (listenSocket) => {
        if (listenSocket) {
          this.listenSocket = listenSocket;
          this.instance;
        } else {
          console.error("Can't start listening...");
        }
      });
    }

    return this.instance;
  }
}
