import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './servico.entity';
import { Subcategoria } from 'src/subcategoria/subcategoria.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { ServicoFoto } from './servicoFoto.entity';
import { ServicoRepository } from './servico.repository';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { SubcategoriaModule } from 'src/subcategoria/subcategoria.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Servico,Subcategoria,Usuario, ServicoFoto]), UsuarioModule, SubcategoriaModule, CloudinaryModule],
  providers: [ServicoService, ServicoRepository],
  controllers: [ServicoController]
})
export class ServicoModule {}
