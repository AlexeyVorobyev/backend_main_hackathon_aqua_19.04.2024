import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1713606867231 implements MigrationInterface {
    name = 'Migrations1713606867231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "clients" integer, CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "external_id" character varying NOT NULL, "bonus_points" integer NOT NULL DEFAULT '0', "date_of_birth" TIMESTAMP WITH TIME ZONE, "sex" character varying NOT NULL DEFAULT 'notStated', CONSTRAINT "UQ_d9479cbc9c65660b7cf9b657954" UNIQUE ("external_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_business" ("user_id" uuid NOT NULL, "business_id" uuid NOT NULL, CONSTRAINT "PK_585cb64c5c86cff4a07c2a54711" PRIMARY KEY ("user_id", "business_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3355213a29545a4cc79a9197c5" ON "user_business" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9cd0fb7516873fce7648b3612" ON "user_business" ("business_id") `);
        await queryRunner.query(`ALTER TABLE "user_business" ADD CONSTRAINT "FK_3355213a29545a4cc79a9197c5d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_business" ADD CONSTRAINT "FK_a9cd0fb7516873fce7648b3612c" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_business" DROP CONSTRAINT "FK_a9cd0fb7516873fce7648b3612c"`);
        await queryRunner.query(`ALTER TABLE "user_business" DROP CONSTRAINT "FK_3355213a29545a4cc79a9197c5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9cd0fb7516873fce7648b3612"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3355213a29545a4cc79a9197c5"`);
        await queryRunner.query(`DROP TABLE "user_business"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "business"`);
    }

}
