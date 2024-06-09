import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { Subcategoria } from 'src/subcategoria/subcategoria.entity';
import { CategoriaRepository } from './categoria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria,Subcategoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository],
  exports: [CategoriaService]
})
export class CategoriaModule {}
