import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Request, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { CreateServicoDTO } from './dto/createServico.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.decorator';
import FiltersServicoDTO from './dto/filtersServico.dto';
import { IsNumber } from 'class-validator';
import { Servico } from './servico.entity';

@Controller('/servico')
@ApiTags('servico')
@ApiBearerAuth()
export class ServicoController {
    constructor(private readonly servicoService:ServicoService){}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createService(@Body() createServicoDTO:CreateServicoDTO, @Request() request, @UploadedFiles() files: Array<Express.Multer.File>){
        return this.servicoService.create(createServicoDTO, request.user.sub, files);
    }

    @Public()
    @Get('/all')
    async getAllServices(@Query(new ValidationPipe({
        transform: true,
        transformOptions: {enableImplicitConversion: true},
        forbidNonWhitelisted: true
    })) filtersServico: FiltersServicoDTO):Promise<Servico[]>{

        return  this.servicoService.getAllServices(filtersServico);
       
    }

    @Public()
    @Get(':id')
    async getServiceById(@Param('id', ParseIntPipe) id:number){
        return this.servicoService.getServiceById(id);
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
