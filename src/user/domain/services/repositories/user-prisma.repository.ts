import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class UserPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async IsExist(data: Partial<User>): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        ...data,
      },
    });
    if (user) return true;
    return false;
  }

  public async IsUsernameExist(username: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (user) return true;
    return false;
  }

  public async IsEmailExist(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) return true;
    return false;
  }

  public async FindUserById(user_id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });
  }

  public async FindOne(data: Partial<User>): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        ...data,
      },
    });
  }

  public async UpdateById(user_id: number, data: Partial<User>): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        ...data,
      },
    });
  }

  public async CountNearbyUsers(
    user_id: number,
    latitude: number,
    longitude: number,
    distanceInDegrees: number,
  ): Promise<number> {
    return await this.prisma.user.count({
      where: {
        AND: [
          {
            NOT: {
              id: user_id,
            },
          },
          {
            latitude: {
              gte: latitude - distanceInDegrees,
              lte: latitude + distanceInDegrees,
            },
          },
          {
            longitude: {
              gte: longitude - distanceInDegrees / Math.cos(latitude * (Math.PI / 180)),
              lte: longitude + distanceInDegrees / Math.cos(latitude * (Math.PI / 180)),
            },
          },
        ],
      },
    });
  }

  public async FindNearbyUsers(
    user_id: number,
    latitude: number,
    longitude: number,
    distanceInDegrees: number,
    page: number,
    size: number,
  ): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: user_id,
            },
          },
          {
            latitude: {
              gte: latitude - distanceInDegrees,
              lte: latitude + distanceInDegrees,
            },
          },
          {
            longitude: {
              gte: longitude - distanceInDegrees / Math.cos(latitude * (Math.PI / 180)),
              lte: longitude + distanceInDegrees / Math.cos(latitude * (Math.PI / 180)),
            },
          },
        ],
      },
      take: size,
      skip: (page - 1) * size,
    });
  }
}
