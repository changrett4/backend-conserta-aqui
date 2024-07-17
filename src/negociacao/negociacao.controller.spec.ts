import { Test, TestingModule } from '@nestjs/testing';
import { NegociacaoController } from './negociacao.controller';
import { NegociacaoService } from './negociacao.service';

describe('NegociacaoController', () => {
  let controller: NegociacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NegociacaoController],
      providers: [NegociacaoService],
    }).compile();

    controller = module.get<NegociacaoController>(NegociacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
