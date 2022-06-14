import { Column ,Entity, PrimaryGeneratedColumn ,ManyToOne,OneToMany} from 'typeorm'
import { Enseignant } from './enseignant';
import { Seance } from './seance';
import { Classe } from './classe';

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

    @OneToMany( ()=> Classe, (classe: Classe) => classe.matiere)
    matieres_classe: Matiere[];




}