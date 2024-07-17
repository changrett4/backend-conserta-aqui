import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NegociacaoService } from './negociacao.service';
import { CreateNegociacaoDto } from './dto/create-negociacao.dto';
import { UpdateNegociacaoDto } from './dto/update-negociacao.dto';
import { Public } from '../auth/auth.decorator';

@Controller('negociacao')
export class NegociacaoController {
  constructor(private readonly negociacaoService: NegociacaoService) {}

  @Post()
  async create(@Body() createNegociacaoDto: CreateNegociacaoDto) {
    return await this.negociacaoService.create(createNegociacaoDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.negociacaoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateNegociacaoDTO:UpdateNegociacaoDto){
      updateNegociacaoDTO.id = id;
      return await this.negociacaoService.update(updateNegociacaoDTO);
  }

  
}