import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNegociacaoDto } from './dto/create-negociacao.dto';
import { UpdateNegociacaoDto } from './dto/update-negociacao.dto';
import { NegociaoRepository } from './negociacao.repository';
import { ConversaService } from '../conversa/conversa.service';
import { Negociacao } from './entities/negociacao.entity';

@Injectable()
export class NegociacaoService {
  constructor(private readonly negociacaoRepository: NegociaoRepository,
              private readonly conversaService:ConversaService
  ){

  }
  async create(createNegociacaoDto: CreateNegociacaoDto) {
    const conversa = await this.conversaService.getById(createNegociacaoDto.conversaId);

    const {conversaId, ...negociacao} = createNegociacaoDto;
    const newNegociacaoObject = {...negociacao, conversa};
    const newNegociacao = this.negociacaoRepository.create(newNegociacaoObject);
    return await this.negociacaoRepository.save(newNegociacao);

  }

  async update(updateNegociacaoDTO:UpdateNegociacaoDto):Promise<Negociacao> {
    const negociacao = await this.findOne(updateNegociacaoDTO.id);

    const updatedNegociacao = Object.assign(negociacao, updateNegociacaoDTO);

    return await this.negociacaoRepository.save(updatedNegociacao);
    
  }


  async findOne(id: number) {
    const negociacao = await this.negociacaoRepository.findOne({
      where: {
        id
      }
    });

    if(!negociacao){
      throw new NotFoundException("Negociacao com esse id não encontrada!");
  }
  return negociacao;
  }

  async findOneNegociacaoByConversa(idConversa: number){
    const negociacao = await this.negociacaoRepository.findOneBy({
      conversa:{
        id: idConversa
      }
    })
    if(!negociacao){
      throw new NotFoundException("Não existe negociação associada a essa conversa!");
  } 
  return negociacao
  }


  async remove(id: number) {
    return `This action removes a #${id} negociacao`;
  }
}
