import { Column ,Entity, PrimaryGeneratedColumn,OneToMany  } from 'typeorm'
import { Classe } from './classe.entity';

@Entity()
export class Annee_academique{
    @PrimaryGeneratedColumn()
    annee: string;

    @OneToMany( ()=> Classe, (classe: Classe) => classe.annee_academique)
    annees: Annee_academique[];
}