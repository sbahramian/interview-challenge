import { GetFindNearbyUsersPageSizePaginationRequestInterface } from 'src/user/application/interfaces';

export class GetNearbyUsersQuery {
  constructor(
    public readonly user_id: number,
    public readonly distance_in_meters: number,
    public readonly param: GetFindNearbyUsersPageSizePaginationRequestInterface,
    public readonly lang: string,
  ) {}
}
