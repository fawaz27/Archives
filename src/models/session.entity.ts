import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Subject } from './subject.entity';
import { Task } from './task.entity';
import { Textbook } from './textbook.entity';

@Entity()
export class Session{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public date: string;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public annex_document: string;

    @Column()
    public summary_course: string;

    @Column()
    public duration: string;

    @ManyToOne( ()=> Subject, (subject : Subject) => subject.sessions) 
    public subject: Subject;

    @OneToMany( ()=> Task, (task: Task) => task.session)
    tasks: Task[];


    @ManyToOne( ()=> Textbook, (textbook : Textbook) => textbook.sessions)
    public textbook: Textbook;



}