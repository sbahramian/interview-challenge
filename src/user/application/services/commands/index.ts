import { UpdateUserProfileHandler } from './update-user-profile';
import { UpdateUserLocationHandler } from './update-user-location';
import { RegisterUserByEmailHandler } from './register-user-by-email';
import { SignupUserAccountHandler } from './signup-user-account';

export * from './update-user-profile';
export * from './update-user-location';
export * from './register-user-by-email';
export * from './signup-user-account';

export const CommandHandlers = [
  UpdateUserProfileHandler,
  RegisterUserByEmailHandler,
  SignupUserAccountHandler,
  UpdateUserLocationHandler,
];
