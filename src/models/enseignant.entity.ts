import {Entity,OneToMany ,ManyToMany, JoinTable,Column} from 'typeorm'
import {User} from './user.entity';
import { Classe } from './classe.entity';
import {Matiere} from './matiere.entity'

@Entity()
export class Enseignant extends User {  
    
  
    @OneToMany( ()=> Matiere, (matiere: Matiere) => matiere.enseignant)
    enseignants: Enseignant[];

    @ManyToMany(()=>Classe)
    @JoinTable()
    classes:Classe[]

}





