import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { CpfIsUniqueValidator } from "./validacao/CpfIsUnique.validator";
import { UsuarioService } from "./usuario.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";
import { Servico } from "src/servico/servico.entity";
import { Subcategoria } from "src/subcategoria/subcategoria.entity";
import { EmailIsUnique } from "./validacao/EmailIsUnique.validator";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { Conversa } from "src/conversa/conversa.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario,Servico,Subcategoria, Conversa]), CloudinaryModule],
    controllers: [UsuarioController],
    providers: [ UsuarioRepository, CpfIsUniqueValidator, EmailIsUnique, UsuarioService],
    exports: [UsuarioService]
})
export class UsuarioModule {}