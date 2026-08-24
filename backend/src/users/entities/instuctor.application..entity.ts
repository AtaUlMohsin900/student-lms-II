import { randomUUID } from "crypto";
import { BeforeInsert, 
    BeforeUpdate, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    Unique
 } from "typeorm";


@Entity({name: 'instructor_applications'})
@Unique('instructor_application_user_unique',['userId'])
    export class InstructorApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @BeforeInsert()
    ensureInsertDefaults(){
        if(!this.id){
            this.id = randomUUID();
        }

        const now = new Date();
        if(!this.createdAt){
            this.createdAt = now;
        }
        if(!this.updatedAt){
            this.updatedAt = now;
        }
    }
    @BeforeUpdate()
    touchUpdateAt(){
        this.updatedAt = new Date();
    }

    @Column({name:'user_id', type:'uuid'})
    userId!: string;   
 
    @Column({
        name:'password_hash', 
        type:'varchar', 
        length: 255, 
        nullable: true
    })
    passwordHash!: string | null;
    
    @Column({type:'enum', enum: InstructorApplicationStatus, default: InstructorApplicationStatus.PENDING})
    status!: InstructorApplicationStatus;
 
    

    @Column({type:'text'})
    bio!: string | null;

    @Column({name:'expertise_areas', type:'date', nullable: true})
    expertiseAreas!: string | null;

    @Column({
        name:'google_id', 
        type:'varchar', 
        length: 255,
        unique: true, 
        nullable: true
    })
    googleId!: string | null;

    @Column({name:'email_verified', type:'boolean', default: false})
    emailVerified!: boolean;

    @Column({name:'last_login', type:'timestamp', nullable: true})
    lastLogin!: Date | null;

    @Column({name:'last_learning_date', type:'date', nullable: true})
    lastLearningDate!: string | null;

    @Column({name:'current_streak', type:'int', default: 0})
    currentStreak!: number;

    
    @Column({name:'created_at', type:'timestamp'})
    createdAt!: Date;

    @Column({name:'updated_at', type:'timestamp'})
    updatedAt!: Date;
}  
 