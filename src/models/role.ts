
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { OneToMany } from 'typeorm';
import {User} from './user';

@Entity()

export class Role
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom_role: string;

    @OneToMany( ()=> User, (user: User) => user.role)
    roles: Role[];

}


;