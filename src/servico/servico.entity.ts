import { Subcategoria } from "../subcategoria/subcategoria.entity";
import { Usuario } from "../usuario/usuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServicoFoto } from "./servicoFoto.entity";

@Entity({name:'servico'})
export class Servico{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo:string

    @Column({type:'text'})
    descricao:string

    @Column({type:'numeric', nullable: true, precision: 6, scale: 2})
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

    @ManyToOne(()=>Usuario)
    @JoinColumn({name: 'prestador_id',referencedColumnName:'id'})
    usuario:Usuario

    @OneToMany(()=> ServicoFoto, (servicoFoto)=> servicoFoto.servico)
    servicoFotos: ServicoFoto[]

}