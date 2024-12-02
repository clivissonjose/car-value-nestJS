import { Expose } from "class-transformer";

export class UserDTO{

  //  Aqui vou colocar tudo que quero expor para o mundo
  @Expose()
  id: number;

  @Expose()
  email: string;
}