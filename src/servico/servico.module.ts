import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './servico.entity';
import { Subcategoria } from 'src/subcategoria/subcategoria.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servico,Subcategoria,Usuario])],
  providers: [ServicoService],
  controllers: [ServicoController]
})
export class ServicoModule {}