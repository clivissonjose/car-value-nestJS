import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

      constructor(@InjectRepository(User) private repo: Repository<User>){

      }

      create(email: string, password: string){

        const User = this.repo.create({email, password});

        return this.repo.save(User);
      }

      //Locate the findOne method and update the return to look like this:

      findOneBy(id: number) {

        if(!id){

        } 
        
        return this.repo.findOneBy({ id });
      }
      //Locate the find method and update the return to look like this:

      find(email: string) {
        return this.repo.find({ where: { email } });
      }

      async update(id: number, attrs: Partial<User>){

        const user = await this.findOneBy(id);

        if(!user){
          throw new NotFoundException("User not found!");
        }

        Object.assign(user, attrs);

        return this.repo.save(user);
      }

      async remove(id: number){
        const user = await this.findOneBy(id);

        if(!user){
          throw new NotFoundException("User not found!");
        }

        return this.repo.remove(user);
      }

}
