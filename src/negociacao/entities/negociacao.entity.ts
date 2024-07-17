import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Conversa } from "../../conversa/conversa.entity";

@Entity({name:'negociacoes'})
export class Negociacao {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'numeric', precision: 8, scale: 2})
    preco:number

    @Column({ type: "char", length: 1 })
    status: string

    @ManyToOne(()=>Conversa, {eager:true})
    @JoinColumn({name:'conversa_id',referencedColumnName:'id'})
    conversa:Conversa
    
    @CreateDateColumn({name:"created_at"})
    createdAt: Date

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date
}
