import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InstructorApplicationEntity } from './entities/instuctor-application.entity';
import { InstructorApplicationDto } from './dto/instructor-application.dto';
import { InstructorApplicationStatus } from './enums/instructor.enmus';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { UserStatus } from './enums/users.enms';

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
      relations: { instructorApplication: true }
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
    } else {
      application = this.applicationRepository.create({
        userId,
        bio: dto.bio,
        education: dto.education,
        experienceYears: dto.experienceYears,
        expertiseAreas: dto.expertiseAreas,
        portfolioUrl: dto.portfolioUrl,
        linkedinUrl: dto.linkedinUrl,
        githubUrl: dto.githubUrl,
        status: InstructorApplicationStatus.PENDING
      })
    }


    return await this.applicationRepository.save(application);
  }
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) throw new NotFoundException('User account not found')
    if (!user.passwordHash) throw new UnauthorizedException('Unable to verify your identity. Please contact support or use the reset password flow for Google/Facebook accounts.')
    const valid = await bcrypt.compare(dto.currentPassword, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Invalid current password');

    user.passwordHash = await bcrypt.hash(dto.newPassword, 12)
    await this.userRepository.save(user)


  }


  async deleteAccount(userId: string, password: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) throw new NotFoundException('User account not found')
    if (!user.passwordHash) throw new UnauthorizedException('Please use password confirmation to delete account')

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Invalid Password');

    user.status = UserStatus.BANNED;
    await this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return this.sanitizeUser(savedUser);
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => this.sanitizeUser(user));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User account not found');

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    return this.sanitizeUser(updatedUser);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User account not found');
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }

  async getApplicationStatus(userId: string) {
    const application = await this.applicationRepository.findOne({
      where: { userId },
    });
    return application ?? null;
  }

  private sanitizeUser(user: UserEntity) {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
