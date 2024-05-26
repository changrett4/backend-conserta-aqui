import { Injectable } from "@nestjs/common";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { Usuario } from "./usuario.entity";

@Injectable()
export class UsuarioRepository extends Repository<Usuario>{
    constructor(private dataSource: DataSource){
        super(Usuario, dataSource.createEntityManager());
    }

}