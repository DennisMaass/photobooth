import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TemplatedApp } from 'uWebSockets.js';

@UseInterceptors(ClassSerializerInterceptor)
@WebSocketGateway(8099, { path: '/ws' })
export class PhotoGateway {
  @WebSocketServer()
  public server: TemplatedApp;

  @SubscribeMessage('takePhoto')
  async handleFlowStepSoundNotification(
    @ConnectedSocket() socket: any,
  ): Promise<void> {
    console.log('takePhoto', socket.id);
  }
}
