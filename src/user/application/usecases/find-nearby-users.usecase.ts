import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetNearbyUsersQuery } from '../services/queries';
import { GetFindNearbyUsersPageSizePaginationRequestInterface, GetMeResponse } from '../interfaces';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import { localiczation } from 'src/common';

@Injectable()
export class FindNearbyUsersInformationUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  public async GetNearbyUsers(
    user_id: number,
    distance_in_meters: number,
    param: GetFindNearbyUsersPageSizePaginationRequestInterface,
    lang: string,
  ): Promise<GetMeResponse> {
    try {
      const data = await this.queryBus.execute(new GetNearbyUsersQuery(user_id, distance_in_meters, param, lang));

      return {
        data: data.users,
        meta: {
          pagination: data.pagination,
          ...localiczation.message(LocalizationMessage.GET_USER_PROFILE_SUCCESSFULLY, { lang }),
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      localiczation.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
