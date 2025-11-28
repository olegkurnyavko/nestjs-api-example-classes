import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { MeModule } from './modules/me/me.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TaskModule,
    AuthModule,
    AdminModule,
    MeModule,
    RouterModule.register([{
      path: 'admin',
      module: AdminModule,
    },
    {
      path: 'me',
      module: MeModule,
    },
    {
      path: 'auth',
      module: AuthModule,
    }
    ]),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: cfg.get<string>('DB_TYPE') as any,
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASSWORD'),
        database: cfg.get<string>('DB_NAME'),
        autoLoadEntities: cfg.get<boolean>('DB_AUTO_LOAD_ENTITIES'),
        synchronize: cfg.get<boolean>('DB_SYNC'),
        logging: cfg.get<boolean>('DB_LOGGING'),
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
