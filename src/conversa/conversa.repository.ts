import { DataSource , Repository } from "typeorm";
import { Conversa } from "./conversa.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConversaRepository extends Repository<Conversa>{
    constructor(private dataSource: DataSource){
        super(Conversa, dataSource.createEntityManager());
    }
}