import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }


MaxLength,
    MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
v export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name?: string;

    @IsOptional()
    @IsString()
    Q@MaxLength(20)
    @Transform(({ value }) => (value === '' ? null : value))
    phone?: string;