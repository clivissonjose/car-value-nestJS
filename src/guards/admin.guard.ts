import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { Observable } from "rxjs";

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest()

      if(!request.CurrentUser){
        return false;
      }

      // Aqui retorna se o  admin é true ou falso evitando criar vários ifs 
      return request.CurrentUser.admin
  }
}