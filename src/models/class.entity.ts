import { Column ,Entity, PrimaryGeneratedColumn, OneToMany,ManyToMany, OneToOne} from 'typeorm'
import { Textbook } from './textbook.entity';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';
import { Working_time } from './working_time.entity';
@Entity()
export class Class{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToMany( ()=> Textbook, (textbook: Textbook) => textbook.classe)
    textbooks: Textbook[];

    @OneToMany( ()=> Subject, (subject: Subject) => subject.classe)
    subjects: Subject[];

    @ManyToMany(()=>Teacher, teacher => teacher.classes)
    teachers:Teacher[]

    @OneToOne(()=>Working_time, (working)=>working.classe)
    working:Working_time


}