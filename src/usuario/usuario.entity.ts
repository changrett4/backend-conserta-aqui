import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


// +id: int
// email: string
// senha: string
// telefone: string
// tipo: char
// cpf: string
// link_foto_perfil: string
// status: char

@Entity({name: 'usuarios'})
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    telefone: string;

    @Column({ type: "char", length: 1 })
    tipo: string;

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



    
    

}