import { NestInterceptor, CallHandler, Injectable, ExecutionContext } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

  constructor(private userService: UsersService){}

  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
      const request = context.switchToHttp().getRequest();
      const { userId } = request.session || {} ;

      if(userId){
        const user = await this.userService.findOneBy(userId);
        request.CurrentUser = user;
      }
      return handler.handle();
  }

}