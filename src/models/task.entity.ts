import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Session } from './session.entity';

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public title: string;

    @Column()
    public date_given: string;

    @Column()
    public date_submission: string;

    @Column()
    public statement: string;

    @Column()
    public document_annex: string;

    @Column()
    public type: string;

    @Column()
    public createdAt: string;

    @ManyToOne( ()=> Session, (session : Session) => session.tasks)
    public session: Session;



    


}