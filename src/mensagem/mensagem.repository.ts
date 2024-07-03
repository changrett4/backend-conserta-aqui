import { Injectable } from "@nestjs/common";
import { Mensagem } from "./mensagem.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class MensagemRepository extends Repository<Mensagem>{
    constructor(private dataSource: DataSource){
        super(Mensagem, dataSource.createEntityManager());
    }

}