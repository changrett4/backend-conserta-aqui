import { Test, TestingModule } from '@nestjs/testing';
import { ServicoController } from './servico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Subcategoria } from '../subcategoria/subcategoria.entity';
import { SubcategoriaModule } from '../subcategoria/subcategoria.module';
import { Usuario } from '../usuario/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { Servico } from './servico.entity';
import { ServicoRepository } from './servico.repository';
import { ServicoService } from './servico.service';
import { ServicoFoto } from './servicoFoto.entity';
import { Categoria } from '../categoria/categoria.entity';

describe('ServicoController', () => {
  let controller: ServicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Servico, Subcategoria, Usuario, ServicoFoto, Categoria],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Servico,Subcategoria, Usuario, ServicoFoto]), 
      UsuarioModule, SubcategoriaModule, CloudinaryModule],
      providers: [ServicoService, ServicoRepository],
      controllers: [ServicoController]
    }).compile();

    controller = module.get<ServicoController>(ServicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
