import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { NearbyUsersInterface, UserProfileInterface } from '../../../interfaces';
import { GetNearbyUsersQuery } from './get-nearby-users.query';
import { PageSizePaginationUtil, localiczation } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum/localization.enum';
import { HttpStatus } from '@nestjs/common';
import { GetUserProfileMap } from '../../../map';
import { User } from '@prisma/client';

@QueryHandler(GetNearbyUsersQuery)
export class GetNearbyUsersHandler implements IQueryHandler<GetNearbyUsersQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: GetNearbyUsersQuery): Promise<NearbyUsersInterface> {
    const lang = query.lang;
    const user_id = query.user_id;

    const exist = await this.userIdExist(user_id);

    if (!exist) {
      throw {
        ...localiczation.message(LocalizationMessage.USER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    const user = await this.userFindById(user_id);
    if (user.latitude === null || user.longitude === null) {
      throw {
        ...localiczation.message(LocalizationMessage.USER_LOCATION_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    const count = await this.countNearbyUsers(user.id, user.latitude, user.longitude, query.distance_in_meters);
    const nearby_users = await this.findNearbyUsers(
      user.id,
      user.latitude,
      user.longitude,
      query.distance_in_meters,
      query.param.page,
      query.param.size,
    );

    const users = (await GetUserProfileMap.items(nearby_users)) as UserProfileInterface[];
    const pagination = PageSizePaginationUtil.prepareMetaPage(count, query.param.page, query.param.size);

    return {
      users,
      pagination,
    };
  }

  private async userIdExist(id: number): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ id });
  }

  private async userFindById(user_id: number): Promise<User> {
    return await this.userPrismaRepository.FindUserById(user_id);
  }

  private async findNearbyUsers(
    user_id: number,
    latitude: number,
    longitude: number,
    distanceInMeters: number,
    page: number,
    size: number,
  ) {
    // Convert distance in meters to degrees
    const distanceInDegrees = distanceInMeters / 111000;

    return await this.userPrismaRepository.FindNearbyUsers(user_id, latitude, longitude, distanceInDegrees, page, size);
  }

  private async countNearbyUsers(user_id: number, latitude: number, longitude: number, distanceInMeters: number) {
    // Convert distance in meters to degrees
    const distanceInDegrees = distanceInMeters / 111000;

    return await this.userPrismaRepository.CountNearbyUsers(user_id, latitude, longitude, distanceInDegrees);
  }
}
