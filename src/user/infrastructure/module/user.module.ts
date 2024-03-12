import { Global, Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPrismaFactory, UserRedisFactory, UserWebsocketFactory } from '../../domain/services/factories';
import { UserPrismaRepository, UserRedisRepository } from '../../domain/services/repositories';
import {
  CheckUserUseCase,
  FindNearbyUsersInformationUseCase,
  LoginUserUseCase,
  RegisterUserUseCase,
  UserInformationUseCase,
} from '../../application/usecases';
import { QueryHandlers } from '../../application/services/queries';
import { CommandHandlers } from '../../application/services/commands';
import { AuthModule } from '../../../auth/infrastructure/module';
import { UserKeyManagerUtility } from '../../application/services/utilities';
import { PrismaService } from 'src/user/domain/services/prisma';
import { ClientV1FindNearbyUsersController, ClientV1UserController } from 'src/user/presentation/controllers';

@Global()
@Module({
  imports: [CqrsModule, forwardRef(() => AuthModule)],
  controllers: [ClientV1UserController, ClientV1FindNearbyUsersController],
  providers: [
    // Utility
    UserKeyManagerUtility,
    // Usecase
    LoginUserUseCase,
    RegisterUserUseCase,
    CheckUserUseCase,
    UserInformationUseCase,
    FindNearbyUsersInformationUseCase,
    // Handler
    ...QueryHandlers,
    ...CommandHandlers,
    // Service
    PrismaService,
    // Factory
    UserPrismaFactory,
    UserRedisFactory,
    UserWebsocketFactory,
    // Repository
    UserPrismaRepository,
    UserRedisRepository,
  ],
  exports: [
    // Usecase
    LoginUserUseCase,
    RegisterUserUseCase,
    CheckUserUseCase,
    UserInformationUseCase,
  ],
})
export class UserModule {}
