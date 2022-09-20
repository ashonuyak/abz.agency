import {MigrationInterface, QueryRunner} from "typeorm";

export class alo1663697733491 implements MigrationInterface {
    name = 'alo1663697733491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" character varying NOT NULL DEFAULT '96d9f803-77e1-4979-9a42-20c319ff197b', "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "photo" character varying NOT NULL, "registration_timestamp" bigint NOT NULL DEFAULT '1663697735369', "positionId" character varying, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UNIQUE_EMAIL" ON "User" ("email") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "UNIQUE_PHONE" ON "User" ("phone") `);
        await queryRunner.query(`CREATE TABLE "Position" ("id" character varying NOT NULL DEFAULT '6ffca8ff-be03-4f77-ba3a-70ba1055a152', "name" character varying NOT NULL, CONSTRAINT "PK_4c5179b1a25cf5c52157d2b2bf4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Token" ("id" character varying NOT NULL DEFAULT '96cb6b9d-0c2b-4f0b-a4a4-c9494e710354', "hash" character varying NOT NULL, CONSTRAINT "PK_206d2a22c0a6839d849fb7016b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UNIQUE_HASH" ON "Token" ("hash") `);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_d93fa74bfc806082aa0000bb917" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_d93fa74bfc806082aa0000bb917"`);
        await queryRunner.query(`DROP INDEX "public"."UNIQUE_HASH"`);
        await queryRunner.query(`DROP TABLE "Token"`);
        await queryRunner.query(`DROP TABLE "Position"`);
        await queryRunner.query(`DROP INDEX "public"."UNIQUE_PHONE"`);
        await queryRunner.query(`DROP INDEX "public"."UNIQUE_EMAIL"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
