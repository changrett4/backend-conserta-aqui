import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateServicoCategoriaSubcategoriaAndModifyUser1717733359559 implements MigrationInterface {
    name = 'GenerateServicoCategoriaSubcategoriaAndModifyUser1717733359559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategorias" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "categoria_id" integer, CONSTRAINT "PK_9bbef90f7112e787d4e4b23d455" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "servico" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "subcategoria_id" integer, "prestador_id" integer, CONSTRAINT "PK_289d0aa6d49f9d0fd65aefc6677" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios_subcategorias_subcategorias" ("usuariosId" integer NOT NULL, "subcategoriasId" integer NOT NULL, CONSTRAINT "PK_1bb2d8ef44fb8d9dc47c7e95623" PRIMARY KEY ("usuariosId", "subcategoriasId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_537fa0d023d492d9bf0967fc7c" ON "usuarios_subcategorias_subcategorias" ("usuariosId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8709206bf63c512ff72d8b4274" ON "usuarios_subcategorias_subcategorias" ("subcategoriasId") `);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "descricao" text`);
        await queryRunner.query(`ALTER TABLE "subcategorias" ADD CONSTRAINT "FK_b15fe98fc00a27b01420611b73b" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "servico" ADD CONSTRAINT "FK_58de0d1bcb7c4e491421e663b00" FOREIGN KEY ("subcategoria_id") REFERENCES "subcategorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "servico" ADD CONSTRAINT "FK_2ceb527cd03a045d3a2b96e4402" FOREIGN KEY ("prestador_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios_subcategorias_subcategorias" ADD CONSTRAINT "FK_537fa0d023d492d9bf0967fc7c7" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuarios_subcategorias_subcategorias" ADD CONSTRAINT "FK_8709206bf63c512ff72d8b42746" FOREIGN KEY ("subcategoriasId") REFERENCES "subcategorias"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios_subcategorias_subcategorias" DROP CONSTRAINT "FK_8709206bf63c512ff72d8b42746"`);
        await queryRunner.query(`ALTER TABLE "usuarios_subcategorias_subcategorias" DROP CONSTRAINT "FK_537fa0d023d492d9bf0967fc7c7"`);
        await queryRunner.query(`ALTER TABLE "servico" DROP CONSTRAINT "FK_2ceb527cd03a045d3a2b96e4402"`);
        await queryRunner.query(`ALTER TABLE "servico" DROP CONSTRAINT "FK_58de0d1bcb7c4e491421e663b00"`);
        await queryRunner.query(`ALTER TABLE "subcategorias" DROP CONSTRAINT "FK_b15fe98fc00a27b01420611b73b"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "descricao"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8709206bf63c512ff72d8b4274"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_537fa0d023d492d9bf0967fc7c"`);
        await queryRunner.query(`DROP TABLE "usuarios_subcategorias_subcategorias"`);
        await queryRunner.query(`DROP TABLE "servico"`);
        await queryRunner.query(`DROP TABLE "subcategorias"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
