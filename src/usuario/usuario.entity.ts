import { Servico } from "../servico/servico.entity";
import { Subcategoria } from "../subcategoria/subcategoria.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nome: string;

    @Column()
    senha: string;

    @Column()
    telefone: string;

    @Column({ type: "char", length: 1 })
    tipo: string;

    @Column({type: 'text', nullable:true})
    descricao: string;

    @Column()
    cpf: string;

    @Column({name:"foto_perfil", nullable: true})
    fotoPerfil:string

    @Column({name:"data_nascimento"})
    dataNascimento: Date

    @CreateDateColumn({name:"created_at"})
    createdAt: Date

    @UpdateDateColumn({name:"updated_at"})
    updatedAt: Date

    @DeleteDateColumn({name:"deleted_at"})
    deletedAt: Date

    @OneToMany(()=> Servico, (servico) => servico.usuario)
    servicos:Servico[]

    @ManyToMany(()=> Subcategoria,{nullable: true})
    @JoinTable()
    subcategorias: Subcategoria[]

}