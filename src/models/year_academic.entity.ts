import { Column ,Entity, PrimaryGeneratedColumn,OneToMany  } from 'typeorm'
import { Textbook } from './textbook.entity';
import { Working_time } from './working_time.entity';

@Entity()
export class Year_Academic{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    year: string;

    @OneToMany( ()=> Textbook, (textbook: Textbook) => textbook.year_academic)
    textbooks: Textbook[];

    @OneToMany( ()=> Working_time, (Working_time: Working_time) => Working_time.year)
    workings: Working_time[];
}