import { Column ,Entity, PrimaryGeneratedColumn,OneToMany  } from 'typeorm'
import { Class } from './class.entity';
import { Textbook } from './textbook.entity';

@Entity()
export class Year_Academic{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    year: string;

    @OneToMany( ()=> Textbook, (textbook: Textbook) => textbook.year_academic)
    textbooks: Textbook[];
}