import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePrecisionPrecoServico1720062815919 implements MigrationInterface {
    name = 'ChangePrecisionPrecoServico1720062815919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servico" ALTER COLUMN "preco" TYPE numeric(8,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servico" ALTER COLUMN "preco" TYPE numeric(6,2)`);
    }

}
