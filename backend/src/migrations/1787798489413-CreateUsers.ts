import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1787798489413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_role_enum"AS ENUM('supper', 'instructor', 'student')`)
        await queryRunner.query(`CREATE TYPE "users_status_enum"AS ENUM('active', 'pending', 'suspended','banned')`)
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
                    { name: 'name', type: 'varchar', length: '100' },
                    { name: 'email', type: 'varchar', length: '255', isUnique: true },
                    { name: 'password_hash', type: 'varchar', length: '255', isNullable: true },
                    { name: 'status', type: 'users_status_enum', default: "'pending'" },
                    { name: 'profile_picture_url', type: 'varchar', length: '500', isNullable: true },
                    { name: 'phone', type: 'varchar', length: "20", isNullable: true },
                    { name: 'date_of_birth', type: 'date', isNullable: true },
                    { name: 'google_id', type: 'varchar', length: "255", isUnique: true, isNullable: true },
                    { name: 'email_verified', type: 'boolean', default: false },
                    { name: 'last_login', type: 'timestamp', isNullable: true },
                    { name: 'last_learning', type: 'date', isNullable: true },
                    { name: 'current_streak', type: 'int', default: 0 },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },







                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users', true);
        await queryRunner.query(`DROP TYPE IF EXISTS "users_role_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "users_status_enum"`);
    }

}
