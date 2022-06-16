import { Entity, PrimaryGeneratedColumn,OneToMany,OneToOne} from 'typeorm'
import { Classe } from './classe.entity';
import { Seance } from './seance.entity';

@Entity()
export class Cahier_texte{
    @PrimaryGeneratedColumn()
    public id: number;

    
    @OneToOne(()=> Classe , classe => classe.cahier_texte)
    @OneToMany( ()=> Seance, (seance: Seance) => seance.cahier_texte)
    cahier_textes: Cahier_texte[];

    


    

   
    


}