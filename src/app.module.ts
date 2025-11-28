import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { MeModule } from './modules/me/me.module';
import { RouterModule } from '@nestjs/core';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
