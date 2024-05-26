import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1716711309346 implements MigrationInterface {
    name = 'CreateUserTable1716711309346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "telefone" character varying NOT NULL, "tipo" character(1) NOT NULL, "cpf" character varying NOT NULL, "foto_perfil" character varying NULL, "data_nascimento" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
