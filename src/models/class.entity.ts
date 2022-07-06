import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany,OneToOne,JoinColumn,ManyToMany} from 'typeorm'
import { Textbook } from './textbook.entity';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';
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


}