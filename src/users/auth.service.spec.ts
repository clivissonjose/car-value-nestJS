import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService :  Partial<UsersService>;
  beforeEach( async () => {
    
    // Create a fake  copy of the user service
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) =>{
        const filteredUsers = users.filter((user) => user.email === email)
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          email,
          password
        } as User;
        users.push(user);
        return Promise.resolve(user);
      }
    }

    const module =  await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        }
      ]
    }).compile()

    service = module.get(AuthService)

  })

  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined()
  })

  it('Create a new user with a salted and hashed password', async function()  {

    const user = await service.signup('asdf@gmail.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  })

  it('Throw an error if user signs up with email that is in use', async () => {
 
      fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
      await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
        BadRequestException,
      );
  })

  it('Throws if sign is called with a unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('Throws if an invalid password is provide', async function() {

    // fakeUsersService.find = () => 
    //   Promise.resolve([{email: 'asdf@asdf.com', password: '3232' } as User])

    await service.signup('laskdjf@alskdfj.com', '23213');
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('Returns a user if the correct password is provided', async () => {

    await service.signup('asdf@asdf.com', '3232');

    const user = await service.signin('asdf@asdf.com', '3232'); 
    expect(user).toBeDefined();
  });
})
