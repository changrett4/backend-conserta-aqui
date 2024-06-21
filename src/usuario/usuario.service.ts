import { HttpException, HttpStatus, Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CreateUsuarioDTO } from "./dto/CreateUsuario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import 'dotenv/config';
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';



@Injectable()
export class UsuarioService {
    constructor(
        private readonly usuarioRepository: UsuarioRepository,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async create(createUserDTO: CreateUsuarioDTO, userPhoto: Express.Multer.File): Promise<Usuario> {
        let publicId:string;
        try {
            const uploadedFile = await this.cloudinaryService.uploadFile(userPhoto, 'usuarios');
            publicId = uploadedFile.public_id;
            createUserDTO.fotoPerfil = uploadedFile.secure_url;
            createUserDTO.senha = await hash(createUserDTO.senha, parseInt(process.env.SALT));
            const newUser = this.usuarioRepository.create(createUserDTO);
            return this.usuarioRepository.save(newUser);

        } catch (error) {
            if(publicId) await this.cloudinaryService.deleteFile([publicId]);
            throw new InternalServerErrorException("Erro ao salvar usuário: " + error.message);
        }


        //return createdUser
    }

    async getUserByCpf(cpf: string) {
        const user = await this.usuarioRepository.findOneBy({
            cpf
        })

        if (!user) {
            throw new NotFoundException("Usuário com este CPF não encontrado!")
        }

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.usuarioRepository.findOneBy({
            email
        });

        if (!user) {
            throw new NotFoundException("Usuário com este e-mail não encontrado!")
        }

        return user;
    }

    async getUserById(id: number): Promise<Usuario> {
        const user = await this.usuarioRepository.findOneBy({
            id
        });

        if (!user) {

            throw new NotFoundException("usuário com este ID não encontrado!")
        }

        return user;
    }


}