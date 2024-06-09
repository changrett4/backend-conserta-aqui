import { IsNumber, IsString } from "class-validator";

export class CreateSubcategoriaDTO{
    @IsString()
    titulo: string;
    @IsNumber()
    categoriaId:number
}