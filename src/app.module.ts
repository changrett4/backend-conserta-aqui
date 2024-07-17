import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { BaseController } from './base.controller';
import { AuthModule } from './auth/auth.module';
import { ServicoModule } from './servico/servico.module';
import { CategoriaModule } from './categoria/categoria.module';
import { SubcategoriaModule } from './subcategoria/subcategoria.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConversaModule } from './conversa/conversa.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { NegociacaoModule } from './negociacao/negociacao.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
    ,TypeOrmModule.forRootAsync({
    useClass: PostgresConfigService,
    inject: [PostgresConfigService]
  }),
  UsuarioModule,
  AuthModule,
  ServicoModule,
  CategoriaModule,
  SubcategoriaModule,
  CloudinaryModule,
  ConversaModule,
  MensagemModule,
  NegociacaoModule],
  controllers: [BaseController],
  providers: [],
})
export class AppModule {}
