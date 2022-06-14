import { Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Classe } from './classe';
import { Seance } from './seance';

@Entity()
export class Cahier_texte{
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne( ()=> Classe, (classe : Classe) => classe.classes)
    public classe: Classe;

    @ManyToOne( ()=> Seance, (seance : Seance) => seance.seances_cahier)
    public seance: Seance;



    

   
    


}