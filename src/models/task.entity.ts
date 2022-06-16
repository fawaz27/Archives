import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Seance } from './seance.entity';

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nom: string;

    @Column()
    public titre: string;

    @Column()
    public date_donne: Date;

    @Column()
    public date_soumission: Date;

    @Column()
    public enonce: string;

    @Column()
    public document_annexe: string;

    @Column()
    public type: string;

    @Column()
    public createdAt: string;

    @ManyToOne( ()=> Seance, (seance : Seance) => seance.seances_task)
    public seance: Seance;



    


}