import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Conversa } from "../conversa/conversa.entity";
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

    @OneToMany(()=>MensagemFoto, (mensagemFoto) => mensagemFoto.mensagem, { cascade: ['insert','update','remove','soft-remove','recover'], eager: true})
    mensagemFotos:MensagemFoto[]

    @ManyToOne(()=> Usuario, {eager:true})
    @JoinColumn({name:'remetente_id',referencedColumnName:'id'})
    remetente:Usuario

    @ManyToOne(()=> Usuario, {eager:true})
    @JoinColumn({name:'destinatario_id',referencedColumnName:'id'})
    destinatario:Usuario

    @CreateDateColumn({name:"created_at"})
    createdAt: Date

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date
}