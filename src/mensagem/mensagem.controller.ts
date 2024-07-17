import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors, Request } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { Public } from '../auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateMensagemDTO } from './dto/createMensagem.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('mensagem')
@ApiTags('mensagem')
export class MensagemController {
    constructor(private readonly mensagemService: MensagemService){}

    @Get("conversa/:id/all")
    //@Public()
    async getAllMessagesByConversa(@Param('id') conversaId: number){
        return await this.mensagemService.getMessagesByConversaId(conversaId);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    async createMessage(@Body() createMessageDTO:CreateMensagemDTO, @Request() request, @UploadedFiles() images: Array<Express.Multer.File>){
        createMessageDTO.images = images;
        createMessageDTO.senderId = request.user.sub;
        return await this.mensagemService.createMessage(createMessageDTO);
    }

    // @Put()
    // async updateMessage(){

    // }

    @Delete(':id')
    async deleteMessage(@Param('id') id: number){
        return await this.mensagemService.deleteMessage(id);
    }

}
