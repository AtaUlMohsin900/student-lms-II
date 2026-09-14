import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.startegy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { InstructorApplicationEntity } from 'src/users/entities/instuctor-application.entity';
import { JwtStartegy } from './strategies/jwt.startegy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secret',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '24d') as any
        }
      })
    }),
    TypeOrmModule.forFeature([UserEntity, InstructorApplicationEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStartegy, GoogleStrategy],
  exports: [AuthService, JwtModule, PassportModule]
})
export class AuthModule { }
