import { Module } from '@nestjs/common';
import { MensagemController } from './mensagem.controller';
import { MensagemService } from './mensagem.service';
import { ChatGateway } from './chat.gateway';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { APP_GUARD } from '@nestjs/core';
import { WsocketGuard } from './wscoket.guard';

@Module({
  imports:[ UsuarioModule,     
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '36000s'}
  })],
  controllers: [MensagemController],
  providers: [MensagemService,ChatGateway],
  exports: [MensagemService]
})
export class MensagemModule {}
