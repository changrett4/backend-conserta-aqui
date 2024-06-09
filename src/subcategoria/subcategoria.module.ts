import { Module } from '@nestjs/common';
import { SubcategoriaService } from './subcategoria.service';
import { SubcategoriaController } from './subcategoria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategoria } from './subcategoria.entity';
import { Servico } from 'src/servico/servico.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { SubcategoriaRepository } from './subcategoria.repository';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategoria,Servico,Categoria]), CategoriaModule],
  providers: [SubcategoriaService, SubcategoriaRepository],
  controllers: [SubcategoriaController],
  exports:[SubcategoriaService]
})
export class SubcategoriaModule {}
