import { Module } from '@nestjs/common';
import { MensagemController } from './mensagem.controller';
import { MensagemService } from './mensagem.service';
import { ChatGateway } from './chat.gateway';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { APP_GUARD } from '@nestjs/core';
import { WsocketGuard } from './wscoket.guard';
import { MensagemRepository } from './mensagem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './mensagem.entity';
import { Conversa } from '../conversa/conversa.entity';
import { Usuario } from '../usuario/usuario.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ConversaModule } from '../conversa/conversa.module';

@Module({
  imports:[ UsuarioModule, CloudinaryModule, ConversaModule,  
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '36000s'}
  }), TypeOrmModule.forFeature([Mensagem, Conversa, Usuario])],
  controllers: [MensagemController],
  providers: [MensagemService,ChatGateway, MensagemRepository],
  exports: [MensagemService]
})
export class MensagemModule {}
