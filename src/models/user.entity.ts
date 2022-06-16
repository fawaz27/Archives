import { Column ,PrimaryGeneratedColumn } from 'typeorm'

export abstract class User{
    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({ type: 'varchar', length: 300 })
    public lastName: string;

    @Column({ type: 'varchar', length: 300 })
    public firstName: string;

    @Column({ type: 'varchar', length: 300 })
    public email: string;

    @Column({ type: 'varchar', length: 300 , nullable: false })
    public hashPassword: string;

    @Column({ type: 'varchar', length: 300 })
    public phone: string;

    @Column({ type: 'varchar', length: 300 })
    public role: string;


}
