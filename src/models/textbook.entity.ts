import { Entity,Column, PrimaryGeneratedColumn,OneToMany,OneToOne} from 'typeorm'
import { Class } from './class.entity';
import { Session } from './session.entity';

@Entity()
export class Textbook{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;


    @OneToOne(()=> Class , classe => classe.textbook)
    
    @OneToMany( ()=> Session, (session: Session) => session.textbook)
    sessions: Session[];

    


    

   
    


}