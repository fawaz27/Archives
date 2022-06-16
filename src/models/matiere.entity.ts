import { Column ,Entity, PrimaryGeneratedColumn ,ManyToOne,OneToMany} from 'typeorm'
import { Enseignant } from './enseignant.entity';
import { Seance } from './seance.entity';
import { Classe } from './classe.entity';

@Entity()
export class Matiere{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nom: string;

    @ManyToOne( ()=> Enseignant, (enseignant : Enseignant) => enseignant.enseignants)
    public enseignant: Enseignant;

    @OneToMany( ()=> Seance, (Seance: Seance) => Seance.matiere)
    matieres_seance: Matiere[];


    @ManyToOne( ()=> Classe, (classe : Classe) => classe.classes_matiere)
    public classe:Classe;


}