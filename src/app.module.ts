import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { BaseController } from './base.controller';
import { AuthModule } from './auth/auth.module';


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
  AuthModule],
  controllers: [BaseController],
  providers: [],
})
export class AppModule {}
