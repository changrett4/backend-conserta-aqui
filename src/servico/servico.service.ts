import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ServicoRepository } from './servico.repository';
import { CreateServicoDTO } from './dto/createServico.dto';
import { Servico } from './servico.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { SubcategoriaService } from '../subcategoria/subcategoria.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ServicoFoto } from './servicoFoto.entity';
import CreateServicoFotoDTO from './dto/createServicoFoto.dto';
import FiltersServicoDTO from './dto/filtersServico.dto';

@Injectable()
export class ServicoService {
    constructor(private readonly servicoRepository:ServicoRepository, 
        private readonly usuarioService:UsuarioService,
        private readonly subcategoriaService:SubcategoriaService,
        private readonly cloudinaryService:CloudinaryService ){}

    async create(createServicoDTO: CreateServicoDTO, userId:number, files: Array<Express.Multer.File>):Promise<Servico>{
        let fotos:string[] = [];
        const servicoFotos:CreateServicoFotoDTO[] = []
        try{

            const uploadPromises = files.map(async (foto) => {
                const result = await this.cloudinaryService.uploadFile(foto.buffer,'sevicos');
                fotos.push(result.public_id);
                const newServicoFoto = new CreateServicoFotoDTO()
                newServicoFoto.linkFoto = result.secure_url; 
                servicoFotos.push(newServicoFoto);
            });
            await Promise.all(uploadPromises);
        } catch(err){
            await this.cloudinaryService.deleteFile(fotos)
            throw new InternalServerErrorException(err.message);
        }
            const [usuario, subcategoria] = await Promise.all([
                                            await this.usuarioService.getUserById(userId),
                                            await this.subcategoriaService.getSubcategoyById(createServicoDTO.subcategoriaId)])

            if(!subcategoria){
                throw new NotFoundException("Subcategoria não encontrada!")
            }
            createServicoDTO.servicoFotos = servicoFotos;
            const {subcategoriaId, ...servico} = createServicoDTO;
            const newServiceObject = {...servico, subcategoria, usuario}
            
            
    
            const newService = this.servicoRepository.create(newServiceObject);
            try{
                return await this.servicoRepository.save(newService);
            } catch(error){
                await this.cloudinaryService.deleteFile(fotos);
                throw new InternalServerErrorException(error.message);
            }
           
        


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

    async getAllServices(filtersServico: FiltersServicoDTO):Promise<Servico[]>{
        const servicos = await this.servicoRepository.getAllServices(filtersServico);
        
        if(servicos.length ==0){
            throw new NotFoundException("Nenhum serviço foi encontrado a partir desses filtros!");
        }
        return servicos;
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
