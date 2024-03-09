import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { localiczation } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum/localization.enum';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserLocationCommand } from './update-user-location.command';
import { UpdateUserLocationInterface } from '../../../interfaces/update-user-location.interface';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { UpdateUserLocationResponseInterface } from '../../../interfaces/update-user-location-response.interface';

@CommandHandler(UpdateUserLocationCommand)
export class UpdateUserLocationHandler implements ICommandHandler<UpdateUserLocationCommand> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(command: UpdateUserLocationCommand): Promise<UpdateUserLocationResponseInterface> {
    const is_updated = await this.updateUserLocation(command.user_id, command.dto, command.lang);

    return is_updated;
  }

  private async updateUserLocation(
    user_id: number,
    update_user_location: UpdateUserLocationInterface,
    lang: string,
  ): Promise<{ is_updated: boolean }> {
    try {
      const exist = await this.checkUserExistById(user_id);

      if (!exist) {
        throw {
          ...localiczation.message(LocalizationMessage.USER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
        };
      }

      await this.userPrismaRepository.UpdateById(user_id, {
        latitude: update_user_location?.latitude,
        longitude: update_user_location?.longitude,
      });

      return {
        is_updated: true,
      };
    } catch (error) {
      console.log(error);
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

  private async checkUserExistById(id: number): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ id });
  }
}
