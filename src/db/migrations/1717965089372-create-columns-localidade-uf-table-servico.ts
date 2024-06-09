import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnsLocalidadeUfTableServico1717965089372 implements MigrationInterface {
    name = 'CreateColumnsLocalidadeUfTableServico1717965089372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servico" ADD "localidade" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "servico" ADD "UF" character varying NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servico" DROP COLUMN "UF"`);
        await queryRunner.query(`ALTER TABLE "servico" DROP COLUMN "localidade"`);
    }

}
