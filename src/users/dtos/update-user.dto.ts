import { IsEmail, IsString, IsOptional } from "class-validator";

export class updateUserDTO {

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  
}