import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.stragegy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], //import configModule so that ConfigService could be available in asynchonised providers
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('JWT_EXPERATION'),
        },
      }),
      inject: [ConfigService], // ConfigService is a part of ConfigModule. If we want to inject ConfigService into useFactory, we have to import its module
    }),
    UsersModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy], //a provider shares its accesable logic to controller or another provider. in this case, localstrategy can use authservice in it
})
export class AuthModule {}
