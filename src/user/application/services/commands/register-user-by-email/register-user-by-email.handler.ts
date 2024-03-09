import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserByEmailCommand } from './register-user-by-email.command';
import { CheckSignUpProcessByEmailInterface } from '../../../../infrastructure/interfaces';
import { UserPrismaFactory } from '../../../../domain/services/factories';
import { localiczation, hashPassword } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum/localization.enum';
import { HttpStatus } from '@nestjs/common';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { CheckUserMap } from '../../../map';

@CommandHandler(RegisterUserByEmailCommand)
export class RegisterUserByEmailHandler implements ICommandHandler<RegisterUserByEmailCommand> {
  constructor(
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly userPrismaFactory: UserPrismaFactory,
  ) {}

  async execute(command: RegisterUserByEmailCommand): Promise<CheckSignUpProcessByEmailInterface> {
    const lang = command.lang;
    const email_exist = await this.emailExist(command.email);

    if (email_exist) {
      throw {
        ...localiczation.message(LocalizationMessage.USER_PHONE_ALREADY_EXIST, { lang }, true, HttpStatus.CONFLICT),
      };
    }

    return await this.registerUserByEmail(
      command.email,
      command.first_name,
      command.last_name,
      command.password,
      command.lang,
    );
  }

  private async emailExist(email: string): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ email });
  }

  private async registerUserByEmail(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    lang: string,
  ): Promise<CheckSignUpProcessByEmailInterface> {
    try {
      const user = await this.userPrismaFactory.Create({
        avatar: '',
        username: email,
        email: email,
        firstName: first_name,
        lastName: last_name,
        password: hashPassword.getHash(password),
      });

      return (await CheckUserMap.signUpProcessByEmail(true, user)) as CheckSignUpProcessByEmailInterface;
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
