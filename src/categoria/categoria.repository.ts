import { DataSource , Repository } from "typeorm";
import { Categoria } from "./categoria.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriaRepository extends Repository<Categoria>{
    constructor(private dataSource: DataSource){
        super(Categoria, dataSource.createEntityManager());
    }
}