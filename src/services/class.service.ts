import { AppDataSource } from '../database/AppDataSource';
import { Class } from '../models/class.entity';
import CreateClassDto from '../dto/class.dto';
import InternalErrorException from '../exceptions/InternalErrorException';
import NoClassFoundException from '../exceptions/class/NoClassFoundException';
import ClassWithThatIDNotExistsException from '../exceptions/class/ClassWithThatIDNotExistsException';
import ClassWithThatNameAndYearAlreadyExistsException from '../exceptions/class/ClassWithThatNameAndYearAlreadyExistsException';

export class ClassService {

    public classRepository;
    

    constructor(){
        
        this.classRepository=AppDataSource.getRepository(Class);
        
    }

    public async getAllClasses(){


        const classes = await this.classRepository.find();
        if (classes && classes.length!=0) {
            return classes;
        } 
        else {
            throw new NoClassFoundException();
        }
    }

    
    public async createClass(classe:CreateClassDto){
        
        
        const isAlreadyExist =  await this.classRepository
                .createQueryBuilder("class")
                .where("class.name = :name ",{name:classe.name})
                .getOne()
   
        if (isAlreadyExist) {
                throw new ClassWithThatNameAndYearAlreadyExistsException(classe.name);
            
        } 
        else{
                const newClass =   new Class() ;
                newClass.name=classe.name;
                const created = await this.classRepository.save(newClass);
                console.log(created);
                if (created) {
                    return created;

                } else {
                    throw new InternalErrorException();
                    
                } 
                    
                    
                
            
        }  

        
    }


    public async getClasseById(id:number){
        const classe = await this.classRepository.findOneBy({id:id});

        if (classe) {
            return classe;
        } 
        else {
            throw  new ClassWithThatIDNotExistsException(id);
        }
        
    }


    public async updateClasse(classe:CreateClassDto,id:number){
        const classeUpdate = await this.classRepository.findOneBy({id:id});

        if (classeUpdate) {

                classeUpdate.name=classe.name;
                
                const result = await this.classRepository.save(classeUpdate);
                if (result) {
                    return result;
                } 
                else {
                    throw new InternalErrorException();      
                }       
                     
            
        } 
        else {
             throw  new ClassWithThatIDNotExistsException(id);
        }
        


    }


    public async deleteClasse(id:number){
        const classe = await this.classRepository.findOneBy({id:id});
        if (classe) {
            const result = await this.classRepository.delete(id);
            if (result) {
                return id;
            } 
            else {
                throw new InternalErrorException();
            }
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id);
        }
    }


}



