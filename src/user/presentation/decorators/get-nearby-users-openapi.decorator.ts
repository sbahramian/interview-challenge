import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetNearbyUsers, GetNearbyUsersSuccessResponse } from '../openapis';
import { CommonResponseOpenApi } from 'src/common';

export function GetNearbyUsersOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(GetNearbyUsers),
    ApiResponse(GetNearbyUsersSuccessResponse),
    ApiResponse(CommonResponseOpenApi.UnauthorizedResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
