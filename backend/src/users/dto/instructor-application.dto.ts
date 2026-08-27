import { Transform } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, IsUrl, MaxLength, Min } from "class-validator";

export class InstructorApplicationDto {
    @IsString()
    bio!: string;
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    expertiseAreas?: string[]

    @IsOptional()
    @IsInt()
    @Min(0)
    experienceYears?: number

    @IsOptional()
    @IsString()
    @Transform(({ value }) => (value === '' ? null : value))
    education?: string

    @IsOptional()
    @IsUrl()
    @MaxLength(500)
    @Transform(({ value }) => (value === '' ? null : value))
    portfolioUrl?: string

    @IsOptional()
    @IsUrl()
    @MaxLength(500)
    @Transform(({ value }) => (value === '' ? null : value))
    linkedinUrl?: string

    @IsOptional()
    @IsUrl()
    @MaxLength(500)
    @Transform(({ value }) => (value === '' ? null : value))
    githubUrl?: string


}
