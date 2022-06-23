import { Column ,Entity, PrimaryGeneratedColumn,OneToMany  } from 'typeorm'
import { Class } from './class.entity';

@Entity()
export class Year_Academic{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    year: string;

    @OneToMany( ()=> Class, (classe: Class) => classe.year_academic)
    classes: Class[];
}