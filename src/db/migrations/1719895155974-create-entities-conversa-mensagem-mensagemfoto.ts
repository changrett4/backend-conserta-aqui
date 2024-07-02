import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntitiesConversaMensagemMensagemfoto1719895155974 implements MigrationInterface {
    name = 'CreateEntitiesConversaMensagemMensagemfoto1719895155974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mensagem_fotos" ("id" SERIAL NOT NULL, "link_foto" character varying NOT NULL, "mensagem_id" integer, CONSTRAINT "PK_e788334a45652acb81485961ad6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mensagem" ("id" SERIAL NOT NULL, "texto" text NOT NULL, "conversa_id" integer, "remetente_id" integer, "destinatario_id" integer, CONSTRAINT "PK_d9d31c3c3a8a1136d07bf8733c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversas" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "usuario_id" integer, "servico_id" integer, CONSTRAINT "PK_437d17a2367997521e4f46cb5ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mensagem_fotos" ADD CONSTRAINT "FK_f36207184b4c4d6539a6da8cdbc" FOREIGN KEY ("mensagem_id") REFERENCES "mensagem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mensagem" ADD CONSTRAINT "FK_31d5734403501aa6b706a074474" FOREIGN KEY ("conversa_id") REFERENCES "conversas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mensagem" ADD CONSTRAINT "FK_dfa37c60c1c8f7e3290240cc07c" FOREIGN KEY ("remetente_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mensagem" ADD CONSTRAINT "FK_6a97bbd55f148749d0787f977d7" FOREIGN KEY ("destinatario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversas" ADD CONSTRAINT "FK_008c39cec6da4c0b7b7d4c99ecf" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversas" ADD CONSTRAINT "FK_ad1f83e8a7c3d1f286c985244d0" FOREIGN KEY ("servico_id") REFERENCES "servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversas" DROP CONSTRAINT "FK_ad1f83e8a7c3d1f286c985244d0"`);
        await queryRunner.query(`ALTER TABLE "conversas" DROP CONSTRAINT "FK_008c39cec6da4c0b7b7d4c99ecf"`);
        await queryRunner.query(`ALTER TABLE "mensagem" DROP CONSTRAINT "FK_6a97bbd55f148749d0787f977d7"`);
        await queryRunner.query(`ALTER TABLE "mensagem" DROP CONSTRAINT "FK_dfa37c60c1c8f7e3290240cc07c"`);
        await queryRunner.query(`ALTER TABLE "mensagem" DROP CONSTRAINT "FK_31d5734403501aa6b706a074474"`);
        await queryRunner.query(`ALTER TABLE "mensagem_fotos" DROP CONSTRAINT "FK_f36207184b4c4d6539a6da8cdbc"`);
        await queryRunner.query(`DROP TABLE "conversas"`);
        await queryRunner.query(`DROP TABLE "mensagem"`);
        await queryRunner.query(`DROP TABLE "mensagem_fotos"`);
    }

}
