import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnNomeUsuario1717262829781 implements MigrationInterface {
    name = 'AddColumnNomeUsuario1717262829781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "nome" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "nome"`);
    }

}
