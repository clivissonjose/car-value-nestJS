import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Ver o usuário atual
export const CurrentUser = createParamDecorator( (data: never, context: ExecutionContext) => {

  const request = context.switchToHttp().getRequest();

  return request.currentUser;
})

// import {createParamDecorator, ExecutionContext} from "@nestjs/common";

// export const CurrentUser = createParamDecorator( (data: never, context: ExecutionContext) => {
//         const request = context.switchToHttp().getRequest();
//         console.log(request.session.userId);
//         return request.currentUser;
//     }