import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany,OneToOne,JoinColumn} from 'typeorm'
import Working from '../interfaces/working.Interface';
import { Year_Academic } from './year_academic.entity';
import { Class } from './class.entity';
@Entity()
export class Working_time{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type:'jsonb'})
    public working: Working;

    @OneToOne(()=>Class,(classe)=>classe.working)
    @JoinColumn()
    classe:Class

    @ManyToOne( ()=> Year_Academic, (Year_Academic : Year_Academic) => Year_Academic.workings)
    year:Year_Academic


}