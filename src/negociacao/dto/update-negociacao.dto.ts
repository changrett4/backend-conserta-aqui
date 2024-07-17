import { PartialType } from '@nestjs/swagger';
import { CreateNegociacaoDto } from './create-negociacao.dto';
import { IsNumber, Min } from 'class-validator';

export class UpdateNegociacaoDto extends PartialType(CreateNegociacaoDto) {
    id: number;
}
