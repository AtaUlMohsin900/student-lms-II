import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";
import { UserRole, UserStatus } from "../enums/users.enms";
import { randomUUID } from "crypto";
import { OneToOne } from "typeorm";
import { InstructorApplicationEntity } from "./instuctor.application..entity";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @BeforeInsert()
    ensureInsertDefaults() {
        if (!this.id) {
            this.id = randomUUID();
        }

        const now = new Date();
        if (!this.createdAt) {
            this.createdAt = now;
        }
        if (!this.updatedAt) {
            this.updatedAt = now;
        }
    }
    @BeforeUpdate()
    touchUpdateAt() {
        this.updatedAt = new Date();
    }

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({
        name: 'password_hash',
        type: 'varchar',
        length: 255,
        nullable: true
    })
    passwordHash!: string | null;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
    roll!: UserRole;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
    status!: UserStatus;

    @Column({
        name: 'profile_picture_url',
        type: 'varchar',
        length: 500,
        nullable: true
    })
    profilePictureUrl!: string | null;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone!: string | null;

    @Column({ name: 'date_of_brith', type: 'date', nullable: true })
    dateOfBrith!: string | null;

    @Column({
        name: 'google_id',
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: true
    })
    googleId!: string | null;

    @Column({ name: 'email_verified', type: 'boolean', default: false })
    emailVerified!: boolean;

    @Column({ name: 'last_login', type: 'timestamp', nullable: true })
    lastLogin!: Date | null;

    @Column({ name: 'last_learning_date', type: 'date', nullable: true })
    lastLearningDate!: string | null;

    @Column({ name: 'current_streak', type: 'int', default: 0 })
    currentStreak!: number;


    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @Column({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;
    @OneToOne(
        () => InstructorApplicationEntity,
        (application) => application.applicant,
        { cascade: true },
    )
    instructorApplication?: InstructorApplicationEntity;
}
