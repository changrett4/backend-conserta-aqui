import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { CpfIsUniqueValidator } from "./validacao/CpfIsUnique.validator";
import { UsuarioService } from "./usuario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    controllers: [UsuarioController],
    providers: [ UsuarioRepository, CpfIsUniqueValidator, UsuarioService]
})
export class UsuarioModule {}