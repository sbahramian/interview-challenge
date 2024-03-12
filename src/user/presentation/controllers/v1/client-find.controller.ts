import { Controller, UseInterceptors, UseGuards, Version, Headers, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../../auth/application/guards';
import { DefaultHeadersInterceptor } from 'src/common/interceptor';
import { FindNearbyUsersInformationUseCase } from 'src/user/application/usecases';
import { GetLanguageDto, GetVersionDto } from 'src/common';
import { RestAuth } from 'src/auth/infrastructure/decorators';
import { JwtPayloadInterface } from 'src/auth/infrastructure/interfaces';
import { GetNearbyUsersOpenApiDecorator } from '../../decorators';
import {
  GetFindNearbyUsersDto,
  GetFindNearbyUsersPageSizePaginationRequestDto,
  GetUserProfileResponseDto,
} from '../../dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(new DefaultHeadersInterceptor())
@ApiTags('Find Nearby Users [Client]')
@Controller('client/v1/find')
export class ClientV1FindNearbyUsersController {
  constructor(private readonly findNearbyUsersInformationUseCase: FindNearbyUsersInformationUseCase) {}

  @Version('1')
  @Get('/nearby-users')
  @GetNearbyUsersOpenApiDecorator()
  public async GetNearbyUsers(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Query() { distanceInMeters }: GetFindNearbyUsersDto,
    @Query() param: GetFindNearbyUsersPageSizePaginationRequestDto,
    @RestAuth() auth: JwtPayloadInterface,
  ): Promise<GetUserProfileResponseDto> {
    return this.findNearbyUsersInformationUseCase.GetNearbyUsers(auth.user.user_id, distanceInMeters, param, language);
  }
}
