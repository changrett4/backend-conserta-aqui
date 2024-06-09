import { Injectable, NotFoundException } from '@nestjs/common';
import { ServicoRepository } from './servico.repository';
import { CreateServicoDTO } from './dto/createServico.dto';
import { Servico } from './servico.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { SubcategoriaService } from 'src/subcategoria/subcategoria.service';

@Injectable()
export class ServicoService {
    constructor(private readonly servicoRepository:ServicoRepository, 
        private readonly usuarioService:UsuarioService,
        private readonly subcategoriaService:SubcategoriaService ){}

    async create(createServicoDTO: CreateServicoDTO, userId:number):Promise<Servico>{
        const usuario = await this.usuarioService.getUserById(userId);

        const subcategoria = await this.subcategoriaService.getSubcategoyById(createServicoDTO.subcategoriaId);
        if(!subcategoria){
            throw new NotFoundException("Subcategoria não encontrada!")
        }
        const {subcategoriaId, ...servico} = createServicoDTO;
        const newServiceObject = {...servico, subcategoria, usuario}

        const newService = this.servicoRepository.create(newServiceObject);

        return await this.servicoRepository.save(newService);


    }

    async delete(serviceId:number):Promise<void>{
        //const servico = await this.getServiceById(serviceId);

        await this.servicoRepository.softDelete(serviceId);
    }

    async getAllServicesByUser(usuarioId:number):Promise<Servico[]>{
       
        return await this.servicoRepository.findBy({
            usuario:{id:usuarioId}
        })
    }

    async getServiceById(serviceId:number):Promise<Servico>{
        const servico = await this.servicoRepository.findOneBy({id:serviceId})
        if(!servico){
            throw new NotFoundException("Serviço com este id não encontrado!")
        }
        return servico;

    }

    async updateService(serviceId:number, createServicoDTO: CreateServicoDTO):Promise<Servico>{
        const servico = await this.getServiceById(serviceId);
        let subcategoria = servico.subcategoria;
        if(createServicoDTO.subcategoriaId !==  servico.subcategoria.id){
            subcategoria = await this.subcategoriaService.getSubcategoyById(createServicoDTO.subcategoriaId);
        }
        const {subcategoriaId, ...updateServico} = createServicoDTO;
        const newService = { id: servico.id, usuario: servico.usuario, subcategoria, ...updateServico};

        return await this.servicoRepository.save(newService);
    }

}
