import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [UserModule, TaskModule],
  controllers: [AdminController]
})
export class AdminModule {}
