import { Controller } from '@nestjs/common';
import { Param, Body, Post, Get, Query, Delete, Patch, 
         Session, UseGuards } from '@nestjs/common';
import { CreateUserDTO} from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { updateUserDTO } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { NotFoundException } from '@nestjs/common';

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
                                                // authService: AuthService
  constructor(private usersService: UsersService, 
              private authService: AuthService){}


 // Saber quem está logado

  @Get('whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User){
      return user;
  }

  @Post('/signout')
  signOut(@Session() session: any){
      session.userId = null;
  }
  // Cadastrar usuário
  @Post('/signup')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any){
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;  

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO,  @Session() session: any){
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;

    return user;
  }

     // Usar interceptors para esconder a senha - aula 1 - seção 8
  //@UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<User | NotFoundException> {
    const user = await this.usersService.findOneBy(parseInt(id))
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }
  // findUser(@Param('id') id: string){
  //   return this.usersService.findOneBy(parseInt(id));
  // }

  @Get()
  findAllUsers(@Query("email") email: string){
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string){
    console.log('ID recebido para exclusão:', parseInt(id));

    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateUserDTO ){

   return this.usersService.update(parseInt(id), body);

  }

}
