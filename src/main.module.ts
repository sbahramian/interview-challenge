import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { REDIS_CONFIG } from './common/config/redis.config';
import { AuthModule } from './auth/infrastructure/module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { DEFAULT_LANGUAGE_CONFIG } from './common/config';
import { UserModule } from './user/infrastructure/module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANGUAGE_CONFIG(),
      loaderOptions: {
        path: path.join(__dirname, './i18n/localization/lang/'),
        watch: true,
      },
      resolvers: [new QueryResolver(['lang', 'l']), { use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
      ignoreEnvFile: process.env.ENV_FILES !== 'true',
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: REDIS_CONFIG('REDIS_DB', 'REDIS_HOST', 'REDIS_USER', 'REDIS_PASS', 'REDIS_PORT'),
        },
      }),
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<string>('LOG_LEVEL', 'debug'),
          prettyPrint: configService.get<string>('LOG_PRETTY', 'false') === 'true',
        },
      }),
    }),
    PrismaModule.forRoot(),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
