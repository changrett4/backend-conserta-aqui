import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";
import { CpfIsUniqueValidator, IsUniqueCpf } from "../validacao/CpfIsUnique.validator";

export class CreateUsuarioDTO {

    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    email:string;
    
    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,{message: "A senha deve ter no mínimo 8 caracteres incluindo, números, letras(maiúsculas e minúsculas) e caracteres especiais"})
    senha: string;

    @Length(11)
    telefone: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1)
    tipo: string;

    fotoPerfil:string;

    @Length(11)
    @IsUniqueCpf({message: "já existe usuário cadastrado com este cpf "})
    cpf: string;
    @Transform(({ value }) => {
        const [day, month, year] = value.split('/');
        if(day && month && year){
            return new Date(`${year}-${month}-${day}`);
        } 
      })
      @IsDate({message: "este formato de data é inválido! o formado correto é dd/MM/yyyy"})
    dataNascimento: Date

}