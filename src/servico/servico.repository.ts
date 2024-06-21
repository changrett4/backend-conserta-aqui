import { DataSource, Repository } from "typeorm";
import { Servico } from "./servico.entity";
import { Injectable } from "@nestjs/common";
import FiltersServicoDTO from "./dto/filtersServico.dto";

@Injectable()
export class ServicoRepository extends Repository<Servico>{
    constructor(private dataSource: DataSource){
        super(Servico, dataSource.createEntityManager());
    }

    async getAllServices(filtersServico: FiltersServicoDTO):Promise<Servico[]>{
        let query = this.createQueryBuilder('servico')
        .leftJoinAndSelect('servico.subcategoria', 'subcategoria')
        .leftJoinAndSelect('subcategoria.categoria','categoria');
        if(filtersServico.texto){
            query = query.andWhere('servico.titulo LIKE :texto OR servico.descricao LIKE :texto',{texto: `%${filtersServico.texto}%`})
        }
        if(filtersServico.categoria){
            query = query.andWhere('categoria.id = :categoriaId', {categoriaId: filtersServico.categoria})
        }
        if(filtersServico.subcategoria){
            query = query.andWhere('subcategoria.id = :subcategoriaId',{subcategoriaId: filtersServico.subcategoria})
        }
        return await query.getMany();

    }
}