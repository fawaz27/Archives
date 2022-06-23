import { Column ,Entity, PrimaryGeneratedColumn ,ManyToOne,OneToMany} from 'typeorm'
import { Teacher} from './teacher.entity'
import { Session } from './session.entity';
import { Class } from './class.entity';

@Entity()
export class Subject{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToOne( ()=> Teacher, (teacher : Teacher) => teacher.subjects)
    public teacher: Teacher;

    @OneToMany( ()=> Session, (session: Session) => session.subject)
    sessions: Session[];


    @ManyToOne( ()=> Class, (classe : Class) => classe.subjects)
    public classe:Class;


}