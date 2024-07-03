import { Injectable, NotFoundException } from '@nestjs/common';
import { Conversa } from './conversa.entity';
import { DataSource, Repository } from 'typeorm';
import { ConversaRepository } from './conversa.repository';
import { CreateConversaDTO } from './dto/createConversa.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ServicoService } from 'src/servico/servico.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ConversaService{
    constructor(private readonly conversaRepository: ConversaRepository,
                private readonly usuarioService:UsuarioService,
                private readonly servicoService:ServicoService){}

    async create(createConversaDTO: CreateConversaDTO): Promise<Conversa>{
        const usuario = await this.usuarioService.getUserById(createConversaDTO.usuarioId);

        const servico = await this.servicoService.getServiceById(createConversaDTO.servicoId);

        const newConversa = this.conversaRepository.create({usuario, servico})

        return await this.conversaRepository.save(newConversa);
    }

    async getAllByUser(userId:number, userType:string):Promise<Conversa[]>{
       // const user = await this.usuarioService.getUserById(userId);
       let chats: Conversa[];
        if(userType === 'C'){
            chats = await  this.conversaRepository.findBy({
                usuario:{
                    id: userId
                }
            })
        }else{
            chats = await this.conversaRepository.findBy({
                servico:{
                    usuario:{
                        id: userId
                    }
                }
            });
        }
        
        if(chats.length ===0){
            throw new NotFoundException("Conversas não encontradas para este usuário!");
        }
        return chats;

    }

    async getById(conversaId:number): Promise<Conversa>{
        const conversa = await this.conversaRepository.findOne({where: {
            id: conversaId
        }});

        if(!conversa){
            throw new NotFoundException("Conversa com esse id não encontrada!");
        }
        return conversa;
    }
}
