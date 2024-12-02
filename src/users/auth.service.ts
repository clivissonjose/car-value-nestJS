import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";


import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{

  constructor(private userService: UsersService){

  }

  async signup(email: string, password: string){

    // 1-  Verificar se o email já está em uso
    const isInUse = await  this.userService.find(email);

    if(isInUse .length){
      throw new BadRequestException("email is already in use");
    }

    // 2 - Hash the user`s password 
    // Generate a salt 

    const salt  = randomBytes(8).toString("hex");

    // hash the salt and password together

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together

    const result = salt + "." + hash.toString('hex');

    // 3 -  Create new user and save it

    const user = this.userService.create(email, result);
    // 4 - return the user

    return user;
  }

  async signin(email: string, password: string){

    // Find the user with the email

    const [users] = await this.userService.find(email);

    if(!users){
      throw new NotFoundException('User not found!');
    }

    const [salt, storedHash] = users.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if(storedHash !== hash.toString('hex')){
       throw new BadRequestException('Bas password');
    }

    return users;
  }


}