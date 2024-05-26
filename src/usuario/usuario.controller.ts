import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDTO } from './dto/CreateUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

    @Post()
    async criarUsuario(@Body() dadosUsuario:CreateUsuarioDTO){
        return {msg:'Usuário criado'};
    }
}
