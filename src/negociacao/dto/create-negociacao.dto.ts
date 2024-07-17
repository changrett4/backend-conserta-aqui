import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateNegociacaoDto {
    @IsNumber()
    @Min(1, {message: 'O id da conversa deve ser válido!'})
    conversaId:number;

    @IsNumber()
    @Min(0.01, {message: 'O preço deve ser maior que zero!'})
    @Type(() => Number)
    preco:number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1)
    status: string;
}
