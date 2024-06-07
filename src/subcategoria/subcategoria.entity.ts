import { Categoria } from "../categoria/categoria.entity";
import { Servico } from "../servico/servico.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'subcategorias'})
export class Subcategoria{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    titulo: string;

    @Column({type:'text'})
    descricao: string;

    @CreateDateColumn({name:"created_at"})
    createdAt: Date

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date

    @OneToMany(()=> Servico, (servico)=> servico.subcategoria)
    servicos: Servico[]

    @ManyToOne(()=> Categoria)
    @JoinColumn({name:'categoria_id',referencedColumnName:'id'})
    categoria: Categoria


}