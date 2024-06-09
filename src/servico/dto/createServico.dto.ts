import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { Usuario } from "src/usuario/usuario.entity";

export class CreateServicoDTO {
    @IsString()
    @IsNotEmpty({message: "O título não pode ser vazio!"})
    titulo:string;

    @IsString()
    @IsNotEmpty({message: "A descrição não pode ser vazia!"})
    descricao:string;

    @IsNumber()
    @IsOptional()
    @Min(0.01,{message:'O preço deve ser maior que zero!'})
    preco:number;

    @IsString()
    @IsOptional()
    localidade:string

    @IsString()
    @IsOptional()
    @Length(2,2)
    UF:string

    @IsNumber()
    @Min(1,{message: "A subcategoria tem que ser válida!"})
    subcategoriaId:number;


}