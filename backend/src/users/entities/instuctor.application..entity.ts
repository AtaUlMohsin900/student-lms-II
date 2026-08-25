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

    @Column({name:'expertise_areas', type:'text', array: true, default: '{}' })
    expertiseAreas!: string | null;

    @Column({type:'text', nullable: true})
    education!: string | null;

    @Column({
        name:'portfolio_url', 
        type:'varchar', 
        length: 500, 
        nullable: true
    })
    portfolioUrl!: string | null;

    @Column({
        name:'linkedin_url', 
        type:'varchar', 
        length: 500, 
        nullable: true
    })
    linkedinUrl!: string | null;

    @Column({
        name:'github_url', 
        type:'varchar', 
        length: 500, 
        nullable: true
    })
    githubUrl!: string | null;

    @Column({name: 'rejection_reason', type:'text', nullable: true})
    rejectionReason!: string | null;

    @Column({name:'reviewed_by', type:'uuid', nullable: true})
    reviewedBy!: string | null;   

    @Column({name:'reviewed_at', type:'timestemp', nullable: true})
    reviewedAt!: Date | null; 

    @Column({name:'created_at', type:'timestamp'})
    createdAt!: Date;

    @Column({name:'updated_at', type:'timestamp'})
    updatedAt!: Date;
}  
 