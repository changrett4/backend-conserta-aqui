import { IsString } from "class-validator";

export class LoginUsuarioDTO {
    @IsString()
    cpf: string;
    @IsString()
    senha: string;
}