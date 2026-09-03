import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../src/user/entities/user.entity';
import { InstuctorApplicationEntity } from '../../src/InstuctorApplicationEntity';
import { Repository } from 'typeorm';


import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';

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
    const passwordhash = await bcrypt.hash(dto.password, 12);
    return passwordhash;

  }
}
