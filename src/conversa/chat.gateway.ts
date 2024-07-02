import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import * as fs from 'fs';
  
  @WebSocketGateway(80,{cors:{ origin: '*'},maxHttpBufferSize:15e6})
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    afterInit(server: Server) {
      console.log('Init');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: any): void {
    // Broadcast the received message to all connected clients
    console.log('Received message:', payload);
    this.server.emit('message', payload);
  }
  }
  