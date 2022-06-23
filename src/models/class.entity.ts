import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany,OneToOne,JoinColumn} from 'typeorm'
import { Year_Academic} from './year_academic.entity'
import { Textbook } from './textbook.entity';
import { Subject } from './subject.entity';
@Entity()
export class Class{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne( ()=> Year_Academic, (year : Year_Academic) => year.classes)
    public year_academic:Year_Academic;

    @OneToOne(()=> Textbook)
    @JoinColumn()
    textbook:Textbook;
    

    @OneToMany( ()=> Subject, (subject: Subject) => subject.classe)
    subjects: Subject[];


}