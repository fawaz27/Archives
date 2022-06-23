import "reflect-metadata" 
import { DataSource } from "typeorm"

import { Year_Academic } from '../models/year_academic.entity'
import { Textbook } from '../models/textbook.entity';
import { Class } from '../models/class.entity';
import { Teacher } from '../models/teacher.entity'
import { Subject } from '../models/subject.entity';
import { Session } from '../models/session.entity';
import { Task } from '../models/task.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT_DB),
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    entities: [
     Teacher,
     Subject,
     Session,
     Class,
     Textbook,
     Task,
     Year_Academic
    ],
    synchronize: true,
});

