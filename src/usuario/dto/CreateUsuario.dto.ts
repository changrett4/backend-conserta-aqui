import { Transform, Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";
import { CpfIsUniqueValidator, IsUniqueCpf } from "../validacao/CpfIsUnique.validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsUniqueEmail } from "../validacao/EmailIsUnique.validator";

export class CreateUsuarioDTO {

    @IsNotEmpty({ message: 'O nome não pode ser vazio!' })
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido!' })
    @IsUniqueEmail({message: "Já existe usuário cadastrado com este email!"})
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

    @IsString()
    @IsOptional()
    descricao: string;

    @IsString()
    @IsOptional()
    fotoPerfil:string;

    @Length(11,11,{message:"O CPF deve possuir 11 caracteres!"})
    @ApiProperty({ example: "11111111111" })
    @IsUniqueCpf({message: "Já existe usuário cadastrado com este CPF!"})
    cpf: string;

    @ApiProperty({ example: "01/01/2001" })
    @Transform(({ value }) => {
        value = value + '';
        const [day, month, year] = value.split('/');
        if(day && month && year){
            return new Date(`${year}-${month}-${day}`);
        } 
      })
      @IsDate({message: "Este formato de data é inválido! O formado correto é dd/MM/yyyy"})
    @Type(() => Date)
    dataNascimento: Date

}