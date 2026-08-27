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
                    { name: 'status', type: 'users_status_enum', default: 'pending' },
                    { name: 'profile_picture_url', type: 'varchar', length: '500', isNullable: true },
                    { name: 'phone', type: 'varchar', length: "20", isNullable: true }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
