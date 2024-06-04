import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";
import { CpfIsUniqueValidator, IsUniqueCpf } from "../validacao/CpfIsUnique.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsuarioDTO {

    @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
    email:string;
    
    @IsString()
    @ApiProperty({ example: "string" })
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,{message: "A senha deve ter no mínimo 8 caracteres incluindo, números, letras(maiúsculas e minúsculas) e caracteres especiais"})
    senha: string;

    @Length(11,11,{message: "O telefone deve possuir 11 caracteres!"})
    telefone: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1)
    tipo: string;

    fotoPerfil:string;

    @Length(11,11,{message:"O CPF deve possuir 11 caracteres!"})
    @ApiProperty({ example: "11111111111" })
    @IsUniqueCpf({message: "Já existe usuário cadastrado com este CPF "})
    cpf: string;

    @ApiProperty({ example: "01/01/2001" })
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        if(day && month && year){
            return new Date(`${year}-${month}-${day}`);
        } 
      })
      @IsDate({message: "Este formato de data é inválido! O formado correto é dd/MM/yyyy"})
    dataNascimento: Date

}