import { AppDataSource } from '../database/AppDataSource';
import { Repository,getRepository } from 'typeorm';
import { Enseignant } from '../models/enseignant.entity';
import CreateEnseignantDto from '../dto/enseignant.dto';
import   bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';

export class AuthentificationService{

    public enseignantRepository;
    
    constructor(){
        
        this.enseignantRepository=AppDataSource.getRepository(Enseignant);
        
    }


    public async Register (enseignant:CreateEnseignantDto){
        
        
        const result = await this.enseignantRepository.findOne( {where:{email:enseignant.email}}  );
        //console.log(result);

        if (result) {
            throw new UserWithThatEmailAlreadyExistsException(enseignant.email);

        } else {

            const hashedPassword = await bcrypt.hash(enseignant.hashPassword, 10);

            enseignant.hashPassword=hashedPassword;
            
            const newEnseignant = this.enseignantRepository.create(enseignant);
            const created = await this.enseignantRepository.save(newEnseignant); 

            console.log(created);

            const tokenData = this.createToken(created);
            const cookie = this.createCookie(tokenData);
            return {cookie,created};
    
        }
    }

    public async LogIn(email:string,password:string){
        const result = await this.enseignantRepository.findOne(({where:{email:`${email}`}}));
        console.log(result);
        if (result) {
            const isPassword = await bcrypt.compare(password,result.hashPassword);
            //console.log("Is password :"+isPassword)
            if (isPassword) {
                const tokenData = this.createToken(result);
                const cookie = this.createCookie(tokenData);
                return {cookie,result};

            } else {
                throw new WrongCredentialsException();
            }

            
        }
        else{
            throw new WrongCredentialsException();
        }


    }

    public async LogOut(){
        return 'Authorization=;Max-age=0';
    }

    public createToken(user: Enseignant)
    {
        const expiresIn = 60 * 60;
        const secret =  process.env.JWT_KEY;
        const dataStoredInToken:DataStoredInToken= {
            _id: String(user.id) ,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken,secret as string,{ expiresIn }),
        };
    }

    public createCookie(tokenData: TokenData )
    {
        return `Authorization = ${tokenData.token}; HttpOnly; Max-Age = ${tokenData.expiresIn}`;
    }

}

