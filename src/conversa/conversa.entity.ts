import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";
import { Mensagem } from "../mensagem/mensagem.entity";
import { Servico } from "../servico/servico.entity";

@Entity({name:'conversas'})
export class Conversa{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToMany(()=> Mensagem, (mensagem) => mensagem.conversa,{ cascade: ['insert','update','remove','soft-remove','recover']})
    mensagens:Mensagem[]

    @ManyToOne(()=> Usuario)
    @JoinColumn({name:'usuario_id',referencedColumnName:'id'})
    usuario:Usuario

    @ManyToOne(()=>Servico, {eager:true})
    @JoinColumn({name:'servico_id',referencedColumnName:'id'})
    servico:Servico

    @CreateDateColumn({name:"created_at"})
    createdAt: Date

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date
}