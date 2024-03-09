import { UpdateUserLocationInterface } from '../../../interfaces';

export class UpdateUserLocationCommand {
  constructor(
    public readonly user_id: number,
    public readonly dto: UpdateUserLocationInterface,
    public readonly lang: string,
  ) {}
}
