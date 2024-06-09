import { DataSource, Repository } from "typeorm";
import { Servico } from "./servico.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ServicoRepository extends Repository<Servico>{
    constructor(private dataSource: DataSource){
        super(Servico, dataSource.createEntityManager());
    }
}