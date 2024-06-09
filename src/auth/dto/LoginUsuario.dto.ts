import { IsEmail, IsString } from "class-validator";

export class LoginUsuarioDTO {

    @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
    email: string;
    @IsString()
    senha: string;
}