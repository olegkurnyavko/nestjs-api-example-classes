import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';

@Module({
  controllers: [MeController],
  imports: [UserModule, TaskModule],
})
export class MeModule {}
