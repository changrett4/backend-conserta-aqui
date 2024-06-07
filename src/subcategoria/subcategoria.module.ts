import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriaController } from './subcategoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategoria } from './subcategoria.entity';
import { Servico } from 'src/servico/servico.entity';
import { Categoria } from 'src/categoria/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategoria,Servico,Categoria])],
  providers: [SubcategoriaService],
  controllers: [SubcategoriaController]
})
export class SubcategoriaModule {}
