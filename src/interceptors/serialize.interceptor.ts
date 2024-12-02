import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler, Next } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToInstance } from "class-transformer";


// Essa interface serve apenas para criar uma simples validação
interface ClassConstrunctor {
   new (...args: any[]):{}
}
export function Serialize(dto: ClassConstrunctor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{

  constructor(private dto: any){

  }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before a request is handled
    // by the request handler
    

    return handler.handle().pipe(
      map((data: any) => {

        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        })
      })
    )
  }
}