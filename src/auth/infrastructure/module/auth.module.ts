import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_CONSTANT } from '../constant';
import { AesUtility, OtpKeyManagerUtility } from '../../application/services/utilities';
import { ClientV1AuthController } from '../../presentation/controllers';
import { AuthByEmailUseCase, AuthTokenUseCase } from '../../application/usecases';
import { AuthRedisFactory } from '../../domain/services/factories';
import { AuthRedisRepository } from '../../domain/services/repositories';
import { QueryHandlers } from '../../application/services/queries';
import { CommandHandlers } from '../../application/services/commands';
import { AuthGuard, SignInAuthGuard } from '../../application/guards';
import { SignInStrategy } from 'src/auth/application/strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: JWT_SECRET_CONSTANT }),
    CqrsModule,
  ],
  controllers: [ClientV1AuthController],
  providers: [
    // Utility
    AesUtility,
    OtpKeyManagerUtility,
    // Guard
    AuthGuard,
    SignInAuthGuard,
    // Strategy
    SignInStrategy,
    // Usecase
    AuthByEmailUseCase,
    AuthTokenUseCase,
    // Handler
    ...CommandHandlers,
    ...QueryHandlers,
    // Factory
    AuthRedisFactory,
    // Repository
    AuthRedisRepository,
  ],
  exports: [AesUtility, JwtModule],
})
export class AuthModule {}
