import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginUsuarioDTO } from './dto/LoginUsuario.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { compare } from 'bcrypt';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsuarioService,
        private jwtService: JwtService
    ){}

    async login(dadosLogin: LoginUsuarioDTO): Promise<{ access_token: string, usuario:Usuario }>{
        const usuario = await this.userService.getUserByEmail(dadosLogin.email);

        if(usuario == null){
            throw new NotFoundException("Usuário com este cpf não encontrado");
        }

        let isValidPassword = await compare( dadosLogin.senha, usuario.senha)
        if(!isValidPassword){
            throw new BadRequestException("Senha incorreta!");
        }

        const payload = { sub: usuario.id, cpf: usuario.cpf };
        return {
          access_token: await this.jwtService.signAsync(payload),
          usuario
        };

        
    }
}
