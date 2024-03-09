import { MetaInterface } from 'src/common';

export interface GetMeResponseInterface {
  user_id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  latitude: number | null;
  longitude: number | null;
}

export interface GetMeResponse {
  data: {
    user: GetMeResponseInterface;
  };
  meta: MetaInterface;
}
