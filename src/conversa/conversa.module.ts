import { Module } from '@nestjs/common';
import { ConversaService } from './conversa.service';

import { ConversaController } from './conversa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/usuario.entity';
import { Servico } from 'src/servico/servico.entity';
import { Mensagem } from '../mensagem/mensagem.entity';
import { Conversa } from './conversa.entity';
import { MensagemFoto } from '../mensagem/mensagemFoto.entity';
import { MensagemModule } from 'src/mensagem/mensagem.module';
import { ConversaRepository } from './conversa.repository';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ServicoModule } from 'src/servico/servico.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario,Servico,Mensagem,Conversa,MensagemFoto]),MensagemModule, UsuarioModule, ServicoModule],
  providers: [ConversaService, ConversaRepository],
  controllers: [ConversaController]
  
})
export class ConversaModule {}
