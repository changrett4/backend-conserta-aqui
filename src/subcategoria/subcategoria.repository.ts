import { DataSource, Repository } from "typeorm";
import { Subcategoria } from "./subcategoria.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SubcategoriaRepository extends Repository<Subcategoria>{
    constructor(private dataSource: DataSource){
        super(Subcategoria, dataSource.createEntityManager());
    }
}