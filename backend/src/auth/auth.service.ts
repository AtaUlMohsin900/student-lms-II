import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../src/user/entities/user.entity';
import { InstuctorApplicationEntity } from '../../src/InstuctorApplicationEntity';
import { Repository } from 'typeorm';


import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

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
      where: { email: dto.mail },
    })
    if (existingUser) {
      throw new ConflictExeption('Email already exists');

    }

  }
}
