import { Body, Controller, Get, Param, Post, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDTO } from './dto/CreateUsuario.dto';
import { UsuarioService } from './usuario.service';
import { Public } from 'src/auth/auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Usuario } from './usuario.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService, private readonly cloudinaryService:CloudinaryService){}

   
    @ApiOperation({summary: "Cria um usuário"})
    @Public()
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async criarUsuario(@UploadedFile() file: Express.Multer.File,@Body() dadosUsuario:CreateUsuarioDTO): Promise<Usuario>{
        return this.usuarioService.create(dadosUsuario, file);
    }

    @ApiOperation({summary: "Retorna dados do usuário pelo id"})
    @Get(":id")
    async getUsuario(@Param('id') id:number): Promise<Usuario>{
        return this.usuarioService.getUserById(id)
    }

    @Public()
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async testFileUpload(@UploadedFile() file: Express.Multer.File, @Body()  dados:CreateUsuarioDTO){

        try{
            return await this.cloudinaryService.uploadFile(file, 'usuarios');
        } catch(error){
            throw new InternalServerErrorException(error.message);
           
        }
        
    }


}
