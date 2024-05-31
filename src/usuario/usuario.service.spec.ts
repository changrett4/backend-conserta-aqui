import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';


describe('UsuarioService', () => {
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [UsuarioService],
    }).compile();

    usuarioService = app.get<UsuarioService>(UsuarioService);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(usuarioService.getHello()).toBe('Hello World!');
    // });
  });
});