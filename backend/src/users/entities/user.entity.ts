import { BeforeInsert, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
        this.updateAt = new Date();
    }

    @Column({type:'varchar', length: 100})
    name: string;   
    
    @Column({type:'varchar', length: 255, unique: true)
    email: string;
 
    @Column({name:'password_hash', type:'varchar', length: 255, nullable: true})
    passwordHash: string | null;
} 
