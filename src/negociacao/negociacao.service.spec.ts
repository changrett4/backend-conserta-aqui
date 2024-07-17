import { Test, TestingModule } from '@nestjs/testing';
import { NegociacaoService } from './negociacao.service';

describe('NegociacaoService', () => {
  let service: NegociacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NegociacaoService],
    }).compile();

    service = module.get<NegociacaoService>(NegociacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
