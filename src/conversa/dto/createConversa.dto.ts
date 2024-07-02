import { IsNumber, Min } from "class-validator";


export class CreateConversaDTO{
    usuarioId:number;
    @IsNumber()
    @Min(1, {message: "O id do serviço deve ser válido!"})
    servicoId:number;
}