import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDescricaoColumnCategoriaSubcategoriaAddColumnPrecoServicoCreateTableServicoFoto1717895035912 implements MigrationInterface {
    name = 'RemoveDescricaoColumnCategoriaSubcategoriaAddColumnPrecoServicoCreateTableServicoFoto1717895035912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "servico_foto" ("id" SERIAL NOT NULL, "link_foto" character varying NOT NULL, "servico_id" integer, CONSTRAINT "PK_0499471a05a4ffbed0894ea7da3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "servico_foto" ADD CONSTRAINT "FK_0d92c7684871de953a67c854ca5" FOREIGN KEY ("servico_id") REFERENCES "servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "servico_foto" DROP CONSTRAINT "FK_0d92c7684871de953a67c854ca5"`);
        await queryRunner.query(`DROP TABLE "servico_foto"`);
    }

}
