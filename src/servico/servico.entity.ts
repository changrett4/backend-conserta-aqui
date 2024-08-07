import { Subcategoria } from "../subcategoria/subcategoria.entity";
import { Usuario } from "../usuario/usuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServicoFoto } from "./servicoFoto.entity";
import { Conversa } from "../conversa/conversa.entity";

@Entity({name:'servico'})
export class Servico{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo:string

    @Column({type:'text'})
    descricao:string

    @Column({type:'numeric', nullable: true, precision: 8, scale: 2})
    preco:number

    @Column({nullable:true})
    localidade:string

    @Column({nullable:true})
    UF:string

    @CreateDateColumn({name:"created_at"})
    createdAt: Date

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date
    
    @ManyToOne(()=> Subcategoria,{
        eager:true
    })
    @JoinColumn({name: 'subcategoria_id',referencedColumnName:'id'})
    subcategoria: Subcategoria

    @ManyToOne(()=>Usuario, { eager:true})
    @JoinColumn({name: 'prestador_id',referencedColumnName:'id' })
    usuario:Usuario

    @OneToMany(()=> ServicoFoto, (servicoFoto)=> servicoFoto.servico, { cascade: ['insert','update','remove','soft-remove','recover'],eager:true})
    servicoFotos: ServicoFoto[]

    @OneToMany(()=> Conversa, (conversa)=> conversa.servico )
    conversas:Conversa[]

}