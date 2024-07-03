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
import { ClientRequest } from 'http';
import { WsocketGuard } from './wscoket.guard';
import { UseGuards } from '@nestjs/common';
import { CreateMensagemDTO } from './dto/createMensagem.dto';
import { MensagemService } from './mensagem.service';
  
  @WebSocketGateway({cors:{ origin: '*'},maxHttpBufferSize:15e6})
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(private readonly mensagemService: MensagemService){}

  
    afterInit(server: Server) {
      console.log('Init');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket): Promise<void> {
      client.join(data.room);
      client.emit('joinedRoom', data.room);
    }
    
    @UseGuards(WsocketGuard)
    @SubscribeMessage('message')
    async handleMessage(@MessageBody() payload: CreateMensagemDTO, @ConnectedSocket() client:any):Promise<void> {
    // Broadcast the received message to all connected clients
    const conversaId = parseInt(payload.room.split('_')[1], 10);
    payload.conversaId = conversaId;
    payload.senderId = client.user.sub;
    await this.mensagemService.createMessage(payload);
    const {senderId, receieverId, ...newPayload} = payload
    console.log('Received message:', payload);
    this.server.to(payload.room).emit('message', {...newPayload, sender: client.id});
  }
  }
  