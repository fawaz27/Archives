import { Column ,Entity, PrimaryGeneratedColumn } from 'typeorm'
import {ManyToOne, OneToMany} from 'typeorm'
import {Role} from './role';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column()
    public nom: string;

    @Column()
    public prenom: string;

    @Column()
    public email: string;

    @Column()
    public hashPassword: string;

    @ManyToOne( ()=> Role, (role : Role) => role.roles)
    public role: Role;




}
