import { AfterInsert, AfterUpdate, AfterRemove,  Column,
         Entity, PrimaryGeneratedColumn , Unique, OneToMany} from "typeorm";
import { Report } from "../reports/report.entity";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string

    @Column({default: true})
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsertion(){
      console.log("User created with id: ", this.id);
    }

    @AfterUpdate()
    logUpdate(){
      console.log("User updated with id: ", this.id);
    }

    @AfterRemove()
    logRemoved(){
      console.log("User removed with id: ", this.id);
    }

 }