import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDTO } from './dto/CreateUsuario.dto';
import { UsuarioService } from './usuario.service';
import { LoginUsuarioDTO } from './dto/LoginUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService){}

    @Post()
    async criarUsuario(@Body() dadosUsuario:CreateUsuarioDTO){
        return this.usuarioService.create(dadosUsuario);
    }

    @Post('/login')
    async loginUsuario(@Body() dadosLogin:LoginUsuarioDTO){
        return this.usuarioService.login(dadosLogin);
    } 
}
