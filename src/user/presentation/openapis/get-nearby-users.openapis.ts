import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetNearbyUsersResponseDto } from '../dto';

export const GetNearbyUsers: ApiOperationOptions = {
  summary: 'Get nearby users information',
  description: 'Get nearby users information API',
};

export const GetNearbyUsersSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Get nearby users process has been successful.',
  type: GetNearbyUsersResponseDto,
};
