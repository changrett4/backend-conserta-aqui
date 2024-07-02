import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversa } from "./conversa.entity";
import { MensagemFoto } from "./mensagemFoto.entity";
import { Usuario } from "../usuario/usuario.entity";

@Entity({name:'mensagem'})
export class Mensagem {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Conversa)
    @JoinColumn({name:'conversa_id',referencedColumnName:'id'})
    conversa:Conversa

    @Column({type: 'text'})
    texto: string;

    @OneToMany(()=>MensagemFoto, (mensagemFoto) => mensagemFoto.mensagem, { cascade: ['insert','update','remove','soft-remove','recover']})
    mensagemFotos:MensagemFoto[]

    @ManyToOne(()=> Usuario)
    @JoinColumn({name:'remetente_id',referencedColumnName:'id'})
    remetente:Usuario

    @ManyToOne(()=> Usuario)
    @JoinColumn({name:'destinatario_id',referencedColumnName:'id'})
    destinatario:Usuario
}