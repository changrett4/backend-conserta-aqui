import { Subcategoria } from "../subcategoria/subcategoria.entity";
import { Usuario } from "../usuario/usuario.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'servico'})
export class Servico{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo:string

    @Column({type:'text'})
    descricao:string

    @CreateDateColumn({name:"created_at"})
    createdAt: Date

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date
    
    @ManyToOne(()=> Subcategoria)
    @JoinColumn({name: 'subcategoria_id',referencedColumnName:'id'})
    subcategoria: Subcategoria

    @ManyToOne(()=>Usuario)
    @JoinColumn({name: 'prestador_id',referencedColumnName:'id'})
    usuario:Usuario

}