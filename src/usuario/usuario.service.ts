import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CreateUsuarioDTO } from "./dto/CreateUsuario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){}

    async create(createUserDTO: CreateUsuarioDTO): Promise<Usuario>{
        const newUser = this.usuarioRepository.create(createUserDTO);
        return this.usuarioRepository.save(newUser);
        //return createdUser
    }
}