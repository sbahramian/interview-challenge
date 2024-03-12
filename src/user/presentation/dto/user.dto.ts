import { MetaDto } from 'src/common/dto/index';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { PageSizePaginationDto } from 'src/common';

export class UserProfileDto {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id!: number;

  @ApiProperty({
    type: String,
    default: 'https://avatar.com/sample-10.png',
  })
  avatar!: string;

  @ApiProperty({
    type: String,
    default: 'Saeid',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 25, {
    message: 'First name must be between 2 and 15 characters long.',
  })
  first_name!: string;

  @ApiProperty({
    type: String,
    default: 'Bahramian',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 25, {
    message: 'Last name must be between 2 and 15 characters long.',
  })
  last_name!: string;

  @ApiProperty({
    type: String,
    default: 'saeid_b',
  })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    type: Number,
    default: 10.52,
  })
  @IsNotEmpty()
  @IsNumber()
  latitude?: number;

  @ApiProperty({
    type: Number,
    default: 10.52,
  })
  @IsNotEmpty()
  @IsNumber()
  longitude?: number;
}

export class GetUserProfileDto {
  @ApiProperty({
    type: UserProfileDto,
  })
  user!: UserProfileDto;
}

export class GetUserProfileResponseDto {
  @ApiProperty({
    type: GetUserProfileDto,
  })
  data!: GetUserProfileDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class UpdateUserProfileDto {
  @ApiProperty({
    type: Boolean,
  })
  is_updated!: boolean;
}

export class UpdateUserProfileResponseDto {
  @ApiProperty({
    type: UpdateUserProfileDto,
  })
  data!: UpdateUserProfileDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class UpdateUserProfileRequestDto {
  @ApiProperty({
    type: String,
    default: 'Saeid',
  })
  @IsOptional()
  @IsString()
  @Length(2, 25, {
    message: 'First must be between 2 and 15 characters long.',
  })
  first_name?: string;

  @ApiProperty({
    type: String,
    default: 'Bahramian',
  })
  @IsOptional()
  @IsString()
  @Length(2, 25, {
    message: 'First name must be between 2 and 15 characters long.',
  })
  last_name?: string;

  @ApiProperty({
    type: String,
    default: 'saeid_b',
  })
  @IsOptional()
  @IsString()
  @Length(4, 20, {
    message: 'Username must be between 4 and 20 characters long.',
  })
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'Username can only contain letters, numbers, hyphens, and underscores.',
  })
  username?: string;

  @ApiProperty({
    type: String,
    default: 'https://avatar.com/sample-10.png',
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class UpdateUserLocationRequestDto {
  @ApiProperty({
    type: Number,
    default: 10.52,
  })
  @IsNotEmpty()
  @IsNumber()
  latitude?: number;

  @ApiProperty({
    type: Number,
    default: 10.52,
  })
  @IsNotEmpty()
  @IsNumber()
  longitude?: number;
}

export class UpdateUserLocationDto {
  @ApiProperty({
    type: Boolean,
  })
  is_updated!: boolean;
}

export class UpdateUserLocationResponseDto {
  @ApiProperty({
    type: UpdateUserLocationDto,
  })
  data!: UpdateUserLocationDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class GetFindNearbyUsersDto {
  @ApiProperty({
    type: Number,
    default: 100,
  })
  distanceInMeters!: number;
}

export class GetFindNearbyUsersPageSizePaginationRequestDto extends PageSizePaginationDto {}

export class GetNearbyUsersDto {
  @ApiProperty({
    type: UserProfileDto,
  })
  users!: UserProfileDto[];
}

export class GetNearbyUsersResponseDto {
  @ApiProperty({
    type: GetNearbyUsersDto,
  })
  data!: GetNearbyUsersDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}
