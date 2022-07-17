
import { AppDataSource } from '../database/AppDataSource';
import CreateTeacherDto from '../dto/teacher.dto';
import InternalErrorException from '../exceptions/InternalErrorException';
import NoUserFoundException from '../exceptions/teacher/NoUserFoundException';
import UserWithThatEmailAlreadyExistsException from '../exceptions/teacher/UserWithThatEmailAlreadyExistsException';
import UserWithThatEmailNotExistsException from '../exceptions/teacher/UserWithThatEmailNotExistsException';
import UserWithThatIDNotExistsException from '../exceptions/teacher/UserWithThatIDNotExistsException';
import { Teacher } from '../models/teacher.entity'
import   bcrypt from 'bcrypt';

export class TeacherService{

    public teacherRepository;
    
    constructor(){
        
        this.teacherRepository=AppDataSource.getRepository(Teacher);
        
    }

    public async createTeacher(teacher:CreateTeacherDto){
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
                
            } else {
                throw new InternalErrorException();
                
            }
        }

    }

    public async getAllTeachers(){
        const users = await this.teacherRepository.find();
        
        if (users && users.length!=0)  {
            return users;
        } 
        else {
            throw  new NoUserFoundException();
            
        }

    }


    public async getTeacherByEmail(email:string){
        const user = await this.teacherRepository.findOneBy({email:`${email}`});
        if (user) {
            return user;
        } 
        else {
            throw new UserWithThatEmailNotExistsException(email);
        }

    }



    public async GetTeacherById(id:number){
        const user = await this.teacherRepository.findOneBy({id:id});
        console.log(user);
        if (user) {
            return user;
        } 
        else {
            throw new UserWithThatIDNotExistsException(id);
        }

    }

    public async UpdateUser(teacher:CreateTeacherDto,id:number){
        const user = await this.teacherRepository.findOneBy({id:id});
        if (user) {
            const updated =await this.teacherRepository.update(id,teacher);
            if (updated) {
                return updated;
            }
            else{
                throw new InternalErrorException();
            }
            
        } else {
            throw new UserWithThatIDNotExistsException(id);
        }

    }




    public async dropTeacher (id:number){
        const result = await this.teacherRepository.findOneBy({id:id});

        if (result) {
            const result1 = await this.teacherRepository.delete(id);
            if (result1) {
                return id;
                
            }
            else{
                throw new InternalErrorException();
            }
        } 
        else {

            throw new UserWithThatIDNotExistsException(id);
            
        }
        

    }

}