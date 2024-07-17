import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateMensagemDTO {
    @IsString()
    @IsNotEmpty({message: 'A mensagem deve estar preenchida!'})
    text: string;
    images: Array<Express.Multer.File>

    senderId: number
    @IsNumber()
    @Min(1, {message: 'O id do destinatário deve ser válido!'})
    @Type(() => Number)
    receieverId: number

    @IsNumber()
    @Min(1, {message: 'O id da conversa deve ser válido!'})
    @Type(() => Number)
    conversaId:number
}