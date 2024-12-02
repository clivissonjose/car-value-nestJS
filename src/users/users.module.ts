import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
//import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
//import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMidleware } from './midlewares/current-user.midleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {

  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMidleware).forRoutes('*');
  }
}
