import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDTO } from './dto/createServico.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.decorator';

@Controller('servico')
@ApiTags('servico')
@ApiBearerAuth()
export class ServicoController {
    constructor(private readonly servicoService:ServicoService){}

    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    async createService(@Body() createServicoDTO:CreateServicoDTO, @Request() request, @UploadedFiles() files: Array<Express.Multer.File>){
        return this.servicoService.create(createServicoDTO, request.user.sub, files);
    }

    @Put(':id')
    async updateService(@Param('id') id:number ,@Body() createServicoDTO:CreateServicoDTO){
        return this.servicoService.updateService(id, createServicoDTO);
    }

    @Delete(':id')
    async deleteService(@Param('id') id:number){
        await this.servicoService.delete(id);
        return {msg:'Serviço deletado com sucesso!'}
    }

    @ApiOperation({summary: "Retorna os serviços relacionados ao usuário logado(token)"})
    @Get('usuario')
    async getAllServiceByLogUser(@Request() request){
        return this.servicoService.getAllServicesByUser(request.user.sub);
    }

    @ApiOperation({summary: "Retorna os serviços relacionados a um usuário com determinado id"})
    @Get('usuario/:id')
    async getAllServiceByUser(@Param('id') id:number) {
        return this.servicoService.getAllServicesByUser(id);
    } 

    @Public()
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
      console.log(files);
    }
}
