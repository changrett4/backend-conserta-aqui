import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mensagem } from "./mensagem.entity";

@Entity({name:'mensagem_fotos'})
export class MensagemFoto{
    @PrimaryGeneratedColumn()
    id:number

    @Column({name:'link_foto'})
    linkFoto:string

    @ManyToOne(()=> Mensagem)
    @JoinColumn({name:'mensagem_id', referencedColumnName:'id'})
    mensagem: Mensagem

}