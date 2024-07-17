import { DataSource, Repository } from "typeorm";
import { Negociacao } from "./entities/negociacao.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NegociaoRepository extends Repository<Negociacao>{
    constructor(private dataSource: DataSource){
        super(Negociacao, dataSource.createEntityManager());
    }
}