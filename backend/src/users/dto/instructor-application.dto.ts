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
    @Transform(({ value }) => (value === '' ? null : value))
    education?: string

} 
