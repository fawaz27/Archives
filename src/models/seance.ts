import { Column ,Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm'
import { Matiere } from './matiere';
import { Task } from './task';
import { Cahier_texte } from './cahier_texte';

@Entity()
export class Seance{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public date: Date;

    @Column()
    public titre: string;

    @Column()
    public descriptif: string;

    @Column()
    public document_annexe: string;

    @Column()
    public cours_resume: string;

    @Column()
    public durre: string;

    @OneToMany( ()=> Cahier_texte, (cahier: Cahier_texte) => cahier.seance)
    seances_cahier: Seance[];

    @ManyToOne( ()=> Matiere, (matiere : Matiere) => matiere.matieres_seance)
    public matiere: Matiere;

    @OneToMany( ()=> Task, (task: Task) => task.seance)
    seances_task: Seance[];

   



    
    


}