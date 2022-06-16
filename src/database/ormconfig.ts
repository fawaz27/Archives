import { ConnectionOptions } from 'typeorm';
import { Annee_academique } from '../models/annee_academique.entity';
import { Cahier_texte } from '../models/cahier_texte.entity';
import { Classe } from '../models/classe.entity';
import { Enseignant } from '../models/enseignant.entity';
import { Matiere } from '../models/matiere.entity';
import { Seance } from '../models/seance.entity';
import { Task } from '../models/task.entity';



const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    entities: [
     Enseignant,
     Matiere,
     Seance,
     Classe,
     Cahier_texte,
     Task,
     Annee_academique
    ],
    synchronize: true,
  };
   
  export default config;