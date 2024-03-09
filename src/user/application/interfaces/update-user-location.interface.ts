import { MetaInterface } from 'src/common';

export interface UpdateUserLocationInterface {
  latitude?: number;
  longitude?: number;
}

export interface UserPayloadResponseInterface {
  latitude?: number;
  longitude?: number;
}

export interface UpdateUserLocationPayloadResponseInterface {
  user: UserPayloadResponseInterface;
  is_updated: boolean;
  need_authorization: boolean;
}

export interface UpdateUserLocationResponse {
  data: UpdateUserLocationPayloadResponseInterface;
  meta: MetaInterface;
}
