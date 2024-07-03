import { Controller, Get, Param } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { Public } from '../auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('mensagem')
@ApiTags('mensagem')
export class MensagemController {
    constructor(private readonly mensagemService: MensagemService){}

    @Get("conversa/:id/all")
    @Public()
    async getAllMessagesByConversa(@Param('id') conversaId: number){
        return await this.mensagemService.getMessagesByConversaId(conversaId);
    }
}
