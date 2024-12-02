import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

// Isso é para evitar erro  no  req.currentUser = user;
declare global{
  namespace Express{
    interface Request{
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMidleware implements NestMiddleware{

  constructor(private usersService: UsersService){};

  async use(req: Request, res: Response, next: NextFunction){
   
    const { userId } = req.session || {};
   
   // console.log('CurrentUser:', req.currentUser);

    if(userId){
      const user = await this.usersService.findOneBy(userId);
      
      req.currentUser = user;
    }

    next();
  }
}