import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CreateUsuarioDTO } from "./dto/CreateUsuario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import 'dotenv/config';



@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository
    ){}

    async create(createUserDTO: CreateUsuarioDTO): Promise<Usuario>{
        createUserDTO.senha = await hash(createUserDTO.senha,parseInt(process.env.SALT));
        const newUser = this.usuarioRepository.create(createUserDTO);
        return this.usuarioRepository.save(newUser);
        //return createdUser
    }

    async getUserByCpf(cpf:string){
        const user = await this.usuarioRepository.findOneBy({
            cpf
        })

        if(!user){
            throw new NotFoundException("Usuário com este CPF não encontrado!")
        }

        return user;
    }

    async getUserByEmail(email:string){
        const user = await this.usuarioRepository.findOneBy({
            email
        });

        if(!user){
            throw new NotFoundException("Usuário com este e-mail não encontrado!")
        }

        return user;
    }

    async getUserById(id: number): Promise<Usuario>{
        const user = await this.usuarioRepository.findOneBy({
            id
        });
        
        if(!user){

            throw new NotFoundException("usuário com este ID não encontrado!")
        }

        return user;
    }


}