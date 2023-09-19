import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TemplatedApp } from 'uWebSockets.js';
import { consola } from "consola";

@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway(8099, { path: '/ws' })
export class PhotoGateway {
  @WebSocketServer()
  public server: TemplatedApp;

  @SubscribeMessage('takePhoto')
  async handleTakePhoto(
    @ConnectedSocket() socket: any,
  ): Promise<void> {
    consola.log('[PhotoGateway][handleTakePhoto]', socket.id);
  }
}
