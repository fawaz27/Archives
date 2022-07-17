import { AppDataSource } from '../database/AppDataSource';
import { Teacher } from '../models/teacher.entity'
import CreateTeacherDto from '../dto/teacher.dto';
import   bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/teacher/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import TokenData from '../interfaces/tokenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import InternalErrorException from '../exceptions/InternalErrorException';
import logInDto from '../dto/login.dto';

export class AuthentificationService{

    public teacherRepository;
    
    constructor(){
        
        this.teacherRepository=AppDataSource.getRepository(Teacher);
        
    }


    public async register (teacher:CreateTeacherDto){
        
        
        const result = await this.teacherRepository.findOne( {where:{email:teacher.email}}  );
        //console.log(result);

        if (result) {
            throw new UserWithThatEmailAlreadyExistsException(teacher.email);

        } 
        else {

            const hashedPassword = await bcrypt.hash(teacher.hashPassword, 10);

            teacher.hashPassword=hashedPassword;
            
            const newTeacher = this.teacherRepository.create(teacher);
            const created = await this.teacherRepository.save(newTeacher); 

            console.log(created);
            if (created) {
                return created;
            }
            else{
                throw new InternalErrorException();
            }

            
    
        }
    }

    public async logIn(login:logInDto){
        
        const result = await this.teacherRepository.findOne(({where:{email:`${login.email}`}}));
        console.log(result);
        if (result) {
            const isPassword = await bcrypt.compare(login.password,result.hashPassword);
            
            if (isPassword) {
                const tokenData = this.createToken(result);
                const cookie = this.createCookie(tokenData);
                return {cookie,result};

            } 
            else {
                throw new WrongCredentialsException();
            }

            
        }
        else{
            throw new WrongCredentialsException();
        }


    }

    public async logOut(){
        return 'Authorization=;Max-age=0';
    }

    public createToken(user: Teacher)
    {
        const expiresIn = 3600;
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

