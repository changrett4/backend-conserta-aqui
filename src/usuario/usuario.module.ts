import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { CpfIsUniqueValidator } from "./validacao/CpfIsUnique.validator";
import { UsuarioService } from "./usuario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";
import { Servico } from "src/servico/servico.entity";
import { Subcategoria } from "src/subcategoria/subcategoria.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario,Servico,Subcategoria])],
    controllers: [UsuarioController],
    providers: [ UsuarioRepository, CpfIsUniqueValidator, UsuarioService],
    exports: [UsuarioService]
})
export class UsuarioModule {}