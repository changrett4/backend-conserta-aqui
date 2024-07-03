import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDataTimeColumnsToMensagemEntity1719975054599 implements MigrationInterface {
    name = 'AddDataTimeColumnsToMensagemEntity1719975054599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mensagem" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mensagem" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "mensagem" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mensagem" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "mensagem" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "mensagem" DROP COLUMN "created_at"`);
    }

}
