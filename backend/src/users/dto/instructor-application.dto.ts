import { IsArray, IsOptional, IsString } from "class-validator";

export class InstructorApplicationDto {
    @IsString()
    bio!: string;
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    expertiseAreas?: string[]

    @IsOptional()
    @IsString()
    education?: string

} 
