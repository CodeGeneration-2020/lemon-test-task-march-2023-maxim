import { Module } from '@nestjs/common';
import { LoggerService } from '../../logger';
import { UserController } from './user.contoller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, LoggerService],
})
export class UserModule {}
