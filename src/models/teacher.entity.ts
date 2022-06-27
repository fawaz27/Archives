import {Entity,OneToMany ,ManyToMany, JoinTable,Column} from 'typeorm'
import {User} from './user.entity';
import { Class } from './class.entity';
import {Subject} from './subject.entity'

@Entity()
export class Teacher extends User {  
    
  
    @OneToMany( ()=> Subject, (subject: Subject) => subject.teacher)
    subjects: Subject[];

    @ManyToMany(()=>Class, classe => classe.teachers)
    @JoinTable()
    classes:Class[]

}





