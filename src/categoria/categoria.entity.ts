import { Subcategoria } from "../subcategoria/subcategoria.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'categorias'})
export class Categoria{
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

    @OneToMany(()=> Subcategoria, (subactegoria) => subactegoria.categoria)
    subcategorias: Subcategoria[]

    
}