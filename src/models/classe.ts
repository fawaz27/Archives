import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Annee_academique } from './annee_academique';
import { Cahier_texte } from './cahier_texte';
import { Matiere } from './matiere';
@Entity()
export class Classe{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public nom: string;

    @ManyToOne( ()=> Annee_academique, (annee : Annee_academique) => annee.annees)
    public annee_academique:Annee_academique;

    @OneToMany( ()=> Cahier_texte, (cahier: Cahier_texte) => cahier.classe)
    classes: Classe[];
    
    @ManyToOne( ()=> Matiere, (matiere : Matiere) => matiere.matieres_classe)
    public matiere:Matiere;


}