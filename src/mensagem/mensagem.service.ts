import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MensagemRepository } from './mensagem.repository';
import { CreateMensagemDTO } from './dto/createMensagem.dto';
import { Mensagem } from './mensagem.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import CreateMensagemFotoDTO from './dto/createMensagemFoto.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { ConversaService } from '../conversa/conversa.service';

@Injectable()
export class MensagemService {
    constructor(private readonly mensagemRepository:MensagemRepository, 
        private readonly cloudinaryService: CloudinaryService,
        private readonly usuarioService: UsuarioService,
        private readonly conversaService: ConversaService){}

    async createMessage(createMessageDTO: CreateMensagemDTO){
        let fotos:string[] = [];
        const mensagemFotos: CreateMensagemFotoDTO[] = [];
        try{    
            const uploadPromises = createMessageDTO.images.map(async (foto) => {
                const result = await this.cloudinaryService.uploadFile(foto, "fotomsg");
                fotos.push(result.public_id);
                const newMensagemFoto = new CreateMensagemFotoDTO();
                newMensagemFoto.linkFoto = result.secure_url;
                mensagemFotos.push(newMensagemFoto);
            });
            await Promise.all(uploadPromises);
        }catch(err){
            await this.cloudinaryService.deleteFile(fotos);
            throw new InternalServerErrorException(err.message);
        }
        const [remetente, destinatario, conversa] = await Promise.all([
            this.usuarioService.getUserById(createMessageDTO.senderId),
            this.usuarioService.getUserById(createMessageDTO.receieverId),
            this.conversaService.getById(createMessageDTO.conversaId)
        ]);
        const newMessagePayload = {
            remetente,
            destinatario,
            mensagemFotos,
            conversa,
            texto: createMessageDTO.text
        }
        const newMessage = this.mensagemRepository.create(newMessagePayload)
        try{
            return await this.mensagemRepository.save(newMessage);
        }catch(error){
            await this.cloudinaryService.deleteFile(fotos);
            throw new InternalServerErrorException(error.message);
        }
    }

    async getMessagesByConversaId(conversaId:number):Promise<Mensagem[]>{
        const messages = this.mensagemRepository.findBy({
            conversa:{
                id: conversaId
            }
        });
        if(!messages){
            throw new NotFoundException("Mensagens não encontradas nessa conversa!")
        }
        return messages;
    }

}
