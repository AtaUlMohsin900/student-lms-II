import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InstructorApplicationEntity } from './entities/instuctor-application.entity';
import { InstructorApplicationDto } from './dto/instructor-application.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(InstructorApplicationEntity)
    private readonly applicationRepository: Repository<InstructorApplicationEntity>) { }


  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['instructorApplication']
    })
    if (!user) throw new NotFoundException('User account not found')
    return this.sanitizeUser(user);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async upsertInstructorApplication(userId: string, dto: InstructorApplicationDto) {
    let application = await this.applicationRepository.findOne({
      where: { userId },
    })
    if (application) {
      if (dto.bio !== undefined) application.bio = dto.bio;
      if (dto.expertiseAreas !== undefined) application.expertiseAreas = dto.expertiseAreas;
      if (dto.experienceYears !== undefined) application.experienceYears = dto.experienceYears;
      if (dto.education !== undefined) application.education = dto.education;
      if (dto.portfolioUrl !== undefined) application.portfolioUrl = dto.portfolioUrl;
      if (dto.linkedinUrl !== undefined) application.linkedinUrl = dto.linkedinUrl;
      if (dto.githubUrl !== undefined) application.githubUrl = dto.githubUrl;
    }


    await this.userRepository.save(user);
    return this.sanitizeUser(user);
  }
  private sanitizeUser(user: UserEntity) {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
