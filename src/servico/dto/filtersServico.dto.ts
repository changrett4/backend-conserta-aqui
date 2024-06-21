import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export default class FiltersServicoDTO {
    @IsOptional()
    @IsString()
    texto?:string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    categoria?:number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    subcategoria?:number;
}