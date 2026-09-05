import { ConflictException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.User.entity';
import { InstuctorApplicationEntity } from '../../src/InstuctorApplicationEntity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
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

    const savedUser = await this.userRepository.save(user);
    const token = await this.generateToken(savedUser);
    return{
      user: this.senitizeUser(savedUser);
      token,
    }
  }

 async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    })
    if (!user) {
      throw new NotFondException('User not found please register');
    }
    if(user.status !== UserStatus.ACTIVE){
      throw new UnauthorizedException('Your account is not active. Please contact with support team')
    }

    if(!user.passwordHash){
      throw new UnauthorizedException('This account require social login')
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      user.passwordHash
    )
    if(!isValidPassword){
      throw new UnauthorizedException('Email or Password is incorrect')
    }

    user.lastlogin = new Date();
    const savedUser = await this.userRepository.save(user);
    const token = await this.generateToken(savedUser);
    return{
      user: this.senitizeUser(savedUser);
      token,
    }
  }

  private async generateToken(user:UserEntity){
    return this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    })
  }

  private senitizeUser(user:UserEntity) {
    const {passwordHash,...userWithoutPassword} =user;
    return userWithoutPassword;
  }
}
