import { MetaPaginationInterface, PageSizePaginationRequestInterface } from 'src/common';

export interface GetFindNearbyUsersPageSizePaginationRequestInterface extends PageSizePaginationRequestInterface {}

export interface UserProfileInterface {
  user_id: number | null;
  avatar: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  username: string;
}

export interface NearbyUsersInterface {
  users: UserProfileInterface[];
  pagination: MetaPaginationInterface;
}
