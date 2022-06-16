import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany,OneToOne,JoinColumn} from 'typeorm'
import { Annee_academique } from './annee_academique.entity';
import { Cahier_texte } from './cahier_texte.entity';
import { Matiere } from './matiere.entity';
@Entity()
export class Classe{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nom: string;

    @ManyToOne( ()=> Annee_academique, (annee : Annee_academique) => annee.annees)
    public annee_academique:Annee_academique;

    @OneToOne(()=> Cahier_texte)
    @JoinColumn()
    cahier_texte:Cahier_texte;
    

    @OneToMany( ()=> Matiere, (matiere: Matiere) => matiere.classe)
    classes_matiere: Classe[];


}