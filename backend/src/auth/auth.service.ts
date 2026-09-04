import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.User.entity';
import { InstuctorApplicationEntity } from '../../src/InstuctorApplicationEntity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';
import { UserRole, UserStatus } from 'src/users/enums/users.enms';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(InstuctorApplicationEntity)
    private readonly applicationRepository: Repository<InstuctorApplicationEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async signup(dto: SignupDto) {
    // step 1: Restrict for dubling email accounts.
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    })
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: passwordHash,
      role: dto.role || UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      emailVerified: true
    })


  }
}
