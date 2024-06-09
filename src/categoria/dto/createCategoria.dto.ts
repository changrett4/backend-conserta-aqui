import { IsString } from "class-validator";

export class CreateCategoriaDTO {
    @IsString()
    titulo:string

}