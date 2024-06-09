import { Injectable } from '@nestjs/common';
import { CategoriaRepository } from './categoria.repository';
import { CreateCategoriaDTO } from './dto/createCategoria.dto';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
    constructor(private readonly categoriaRepository:CategoriaRepository){}

    async create(createCategoriaDto:CreateCategoriaDTO):Promise<Categoria>{
        const newCategory = await this.categoriaRepository.create(createCategoriaDto);
        return this.categoriaRepository.save(newCategory);
    }

    async getAllCategories():Promise<Categoria[]>{
       return await this.categoriaRepository.find({relations:{
        subcategorias:true
       }})
    }

    async getCategoryById(id:number):Promise<Categoria> {
        return await this.categoriaRepository.findOneBy({
            id
        });
    }
}
