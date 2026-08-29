import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInstructorApplication1787886310448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "instructorApplications_status_enum"AS ENUM('pending', 'approved', 'rejected')`)
        await queryRunner.createTable(
            new Table({
                name: 'InstructorApplications',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
                    { name: 'user_id', type: 'uuid', isUnique: true },
                    { name: 'status', type: 'instructorApplications_status_enum', default: 'pending' },
                    { name: 'bio', type: 'text'},
                    { name: 'expertise_areas', type: 'text',isArray: true, default: "'{}'" },
                    { name: 'experience_years', type: 'int', isNullable: true },
                    { name: 'education', type: 'text', isNullable: true},
                    { name: 'portfolio_url', type: 'varchar', length: '500', isNullable: true },
                    { name: 'linkedin_url', type: 'varchar', length: '500', isNullable: true },
                    { name: 'github_url', type: 'varchar', length: '500', isNullable: true },
                    { name: 'rejection_reason', type: 'text', isNullable: true },
                    { name: 'reviewed_by', type: 'uuid', isNullable: true },
                    { name: 'reviewed_at', type: 'timestamp', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },

                ]
            }),
            true
        );
        await queryRunner.createForeignKey(
            'Instructor_applications',
            new TableForeignKey({
                columnNames:['user_id'],
                referencedTableName:'users',
                referencedColumnNames:['id'],
                 

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('Instructor_applications');
        const fk = table?.foreignKey.find((k)=> k.columnNames.indexOf('user_if')!== -1);
        if(fk) await queryRunner.dropForeignKey('Instructor_applications', fk)
        await queryRunner.dropTable('InstructorApplications', true);
        await queryRunner.query(`DROP TYPE IF EXISTS "instructorApplications_status_enum"`);
        
    }

}
