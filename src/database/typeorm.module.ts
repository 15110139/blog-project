import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentService } from '../core/environment/environment.service';
import { CONNECTION_NAME } from '../core/definitions/connection-database';
import { DB_KEY, decryptAES } from '../core/utils/cryptor';
import { EnvironmentModule } from 'src/core/environment/environment.module';

export const typeormModule = () =>
  TypeOrmModule.forRootAsync({
    imports: [EnvironmentModule],
    inject: [EnvironmentService],
    useFactory: async (
      env: EnvironmentService,
    ): Promise<TypeOrmModuleOptions> => {
      return <TypeOrmModuleOptions>{
        name: CONNECTION_NAME.DEFAULT,
        logging: true,
        type: 'mysql',
        host: env.ENVIRONMENT.DB_HOST,
        port: env.ENVIRONMENT.DB_PORT,
        username: env.ENVIRONMENT.DB_USER,
        database: env.ENVIRONMENT.DB_NAME,
        password: decryptAES(
          Buffer.from(env.ENVIRONMENT.DB_PASSWORD, 'base64'),
          DB_KEY,
        ).toString('base64'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        keepConnectionAlive: true,
        extra: {
          connectionLimit: 10,
        },
      };
    },
  });
