import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableNegociacao1721178796950 implements MigrationInterface {
    name = 'CreateTableNegociacao1721178796950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "negociacoes" ("id" SERIAL NOT NULL, "preco" numeric(8,2) NOT NULL, "status" character(1) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "conversa_id" integer, CONSTRAINT "PK_36fb42f91e6b56dc03fd2419b0f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "negociacoes" ADD CONSTRAINT "FK_b4f9f5612bee4e3c19ac80725b7" FOREIGN KEY ("conversa_id") REFERENCES "conversas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "negociacoes" DROP CONSTRAINT "FK_b4f9f5612bee4e3c19ac80725b7"`);
        await queryRunner.query(`DROP TABLE "negociacoes"`);
    }

}
