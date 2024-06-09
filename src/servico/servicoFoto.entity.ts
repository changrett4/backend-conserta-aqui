import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Servico } from "./servico.entity";

@Entity({name:'servico_foto'})
export class ServicoFoto {
    @PrimaryGeneratedColumn()
    id:number

    @Column({name: 'link_foto'})
    linkFoto:string

    @ManyToOne(()=> Servico)
    @JoinColumn({name:'servico_id', referencedColumnName:'id'})
    servico: Servico

}