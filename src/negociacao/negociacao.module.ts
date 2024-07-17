import { Module } from '@nestjs/common';
import { NegociacaoService } from './negociacao.service';
import { NegociacaoController } from './negociacao.controller';
import { ConversaModule } from '../conversa/conversa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Negociacao } from './entities/negociacao.entity';
import { Conversa } from '../conversa/conversa.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Mensagem } from '../mensagem/mensagem.entity';
import { NegociaoRepository } from './negociacao.repository';

@Module({
  imports: [ConversaModule, TypeOrmModule.forFeature([Negociacao, Conversa, Usuario, Mensagem])],
  controllers: [NegociacaoController],
  providers: [NegociacaoService, NegociaoRepository],
})
export class NegociacaoModule {}
