import { Injectable, NotFoundException } from '@nestjs/common';
import { SubcategoriaRepository } from './subcategoria.repository';
import { CreateSubcategoriaDTO } from './dto/createSubcategoria.dto';
import { Subcategoria } from './subcategoria.entity';
import { CategoriaService } from 'src/categoria/categoria.service';

@Injectable()
export class SubcategoriaService {
    constructor(private readonly subcategoriaRepository: SubcategoriaRepository, 
        private readonly categoriaService:CategoriaService){}

    async create(createSubcategoriaDTO: CreateSubcategoriaDTO):Promise<Subcategoria>{
        const categoria = await this.categoriaService.getCategoryById(createSubcategoriaDTO.categoriaId);
        const newSubcategory = this.subcategoriaRepository.create({titulo: createSubcategoriaDTO.titulo, categoria});
        return await this.subcategoriaRepository.save(newSubcategory);
    }

    async getAllByCategory(categoryId:number):Promise<Subcategoria[]>{
        return await this.subcategoriaRepository.findBy({categoria:{id: categoryId}});
    }

    async getSubcategoyById(subcategoryId:number):Promise<Subcategoria>{
        const subcategoria = await this.subcategoriaRepository.findOneBy({
            id:subcategoryId
        });
        if(!subcategoria){
            throw new NotFoundException("Subcategoria não encontrada!")
        }
        return subcategoria;
    }
}
