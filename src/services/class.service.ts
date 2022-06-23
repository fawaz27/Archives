import { AppDataSource } from '../database/AppDataSource';
import { Class } from '../models/class.entity';
import { Textbook } from '../models/textbook.entity';
import { Year_Academic } from '../models/year_academic.entity'
import CreateClassDto from '../dto/class.dto';
import InternalErrorException from '../exceptions/InternalErrorException';
import NoClassFoundException from '../exceptions/classe/NoClassFoundException';
import ClassWithThatIDNotExistsException from '../exceptions/classe/UserWithThatIDNotExistsException';

export class ClassService {

    public classRepository;
    public textbookRepository;
    public yearRepository;

    constructor(){
        
        this.classRepository=AppDataSource.getRepository(Class);
        this.textbookRepository=AppDataSource.getRepository(Textbook);
        this.yearRepository=AppDataSource.getRepository(Year_Academic);
        
    }

    public async GetAllClasses(){


        const classes = await this.classRepository.find({relations:["year_academic","textbook"]});
        if (classes && JSON.stringify(classes)!='[]') {
            return classes;
        } else {
            throw new NoClassFoundException();
        }
    }

    
    public async CreateClass(classe:CreateClassDto){


        const year = await this.yearRepository.findOne({where:{year:`${classe.yearAcademic}`}})

        if (year) {

            const newTextbook = new Textbook();
            newTextbook.title="Textbook - "+classe.name;
            const result = await this.textbookRepository.save(newTextbook);


            const newClass =   new Class() ;
            newClass.name=classe.name;
            newClass.year_academic=year;
            newClass.textbook=newTextbook;
            const created = await this.classRepository.save(newClass);

            console.log(created);
            if (created) {
                return created;
                
            } else {
                throw new InternalErrorException();
                
            }
            

        } else {



            const newAnnee= new Year_Academic();
            newAnnee.year=classe.yearAcademic;
            const created1= await this.yearRepository.save(newAnnee);

            const newTextbook = new Textbook();
            newTextbook.title="Textbook - "+classe.name;
            const result = await this.textbookRepository.save(newTextbook);

            
            const newClass =   new Class() ;
            newClass.name=classe.name;
            newClass.year_academic=newAnnee;
            newClass.textbook=newTextbook;
            const created2 = await this.classRepository.save(newClass);
            console.log(created2);
            if (created2) {
                return created2;

            } else {
                throw new InternalErrorException();
                
            } 
                
                
            
        }
        

        
    }


    public async GetClasseById(id:number){
        const classe = await this.classRepository.findOne({
            where:{id:id},relations:["year_academic","textbook"]
        });

        if (classe) {
            return classe;
        } else {
            throw  new ClassWithThatIDNotExistsException(id);
        }
        
    }


    public async UpdateClasse(classe:CreateClassDto,id:number){
        const classeUpdate = await this.classRepository.findOne({
            where:{id:id},relations:["year_academic","textbook"]
        });

        if (classeUpdate) {

            const year = await this.yearRepository.findOne({where:{year:`${classe.yearAcademic}`}});

            if (year) {
                classeUpdate.name=classe.name;
                classeUpdate.year_academic=year;
                const result = await this.classRepository.save(classeUpdate);
                if (result) {
                    return result;
                } else {
                    throw new InternalErrorException();      
                }
            } else {
                const newAnnee= new Year_Academic();
                newAnnee.year=classe.yearAcademic;
                const created1= await this.yearRepository.save(newAnnee);

                classeUpdate.name=classe.name;
                classeUpdate.year_academic=newAnnee;
                const result = await this.classRepository.save(classeUpdate);
                if (result) {
                    return result;
                } else {
                    throw new InternalErrorException();      
                }

                
            }              
            
        } else {
             throw  new ClassWithThatIDNotExistsException(id);
        }
        


    }


    public async DeleteClasse(id:number){
        const classe = await this.classRepository.findOneBy({id:id});
        if (classe) {
            const result = await this.classRepository.delete(id);
            if (result) {
                return id;
            } else {
                throw new InternalErrorException();
            }
        } else {
            throw new ClassWithThatIDNotExistsException(id);
        }
    }


}



