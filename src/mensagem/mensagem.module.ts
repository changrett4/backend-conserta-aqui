import { Module } from '@nestjs/common';
import { MensagemController } from './mensagem.controller';
import { MensagemService } from './mensagem.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { MensagemRepository } from './mensagem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './mensagem.entity';
import { Conversa } from '../conversa/conversa.entity';
import { Usuario } from '../usuario/usuario.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ConversaModule } from '../conversa/conversa.module';

@Module({
  imports:[ UsuarioModule, CloudinaryModule, ConversaModule, 
    TypeOrmModule.forFeature([Mensagem, Conversa, Usuario])],
  controllers: [MensagemController],
  providers: [MensagemService, MensagemRepository],
  exports: [MensagemService]
})
export class MensagemModule {}
