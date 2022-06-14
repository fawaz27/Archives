import { Column ,Entity,OneToMany ,ManyToMany, JoinTable} from 'typeorm'
import {User} from './user';
import { Classe } from './classe';
import {Matiere} from './matiere'

@Entity()
export class Enseignant extends User {  
    @Column()
    public phone: string;
   
    @OneToMany( ()=> Matiere, (matiere: Matiere) => matiere.enseignant)
    enseignants: Enseignant[];

    @ManyToMany(()=>Classe)
    @JoinTable()
    classes:Classe[]

    

}
