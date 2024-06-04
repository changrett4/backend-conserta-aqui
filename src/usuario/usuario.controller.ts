import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsuarioDTO } from './dto/CreateUsuario.dto';
import { UsuarioService } from './usuario.service';
import { Public } from 'src/auth/auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Usuario } from './usuario.entity';

@ApiBearerAuth()
@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService){}

   
    @ApiOperation({summary: "Cria um usuário"})
    @Public()
    @Post()
    async criarUsuario(@Body() dadosUsuario:CreateUsuarioDTO): Promise<Usuario>{
        return this.usuarioService.create(dadosUsuario);
    }

    @ApiOperation({summary: "Retorna dados do usuário pelo id"})
    @Get(":id")
    async getUsuario(@Param('id') id:number): Promise<Usuario>{
        return this.usuarioService.getUserById(id)
    }


}
