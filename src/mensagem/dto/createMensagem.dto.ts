export class CreateMensagemDTO {
    room: string;
    text: string;
    images: Uint8Array[]
    senderId: number
    receieverId: number
    conversaId:number
}