import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInstructorApplication1787886310448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "InstructorApplications_status_enum"AS ENUM('pending', 'approved', 'rejected')`)
        await queryRunner.createTable(
            new Table({
                name: 'InstructorApplications',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
                    { name: 'user_id', type: 'uuid', isUnique: true },
                    { name: 'email', type: 'varchar', length: '255', isUnique: true },
                    { name: 'password_hash', type: 'varchar', length: '255', isNullable: true },
                    { name: 'status', type: 'users_status_enum', default: 'pending' },
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
        await queryRunner.dropTable('InstructorApplications', true);
        await queryRunner.query(`DROP TYPE IF EXISTS "users_role_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "users_status_enum"`);
    }

}
