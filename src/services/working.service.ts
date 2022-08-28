import { AppDataSource } from '../database/AppDataSource';
import { Class } from '../models/class.entity';
import { Working_time } from '../models/working_time.entity';
import CreateWorkingDto from '../dto/working.dto';
import InternalErrorException from '../exceptions/InternalErrorException';
import ClassWithThatIDNotExistsException from '../exceptions/class/ClassWithThatIDNotExistsException';
import { Year_Academic } from '../models/year_academic.entity';
import YearWithThatNameNotExistsException from '../exceptions/year/YearWithThatNameNotExistsException';
import validate_year_academic from '../utils/validator-year_academic';
import FormatYearException from '../exceptions/year/FormatYearException';
import NoWorkingForClassFoundException from '../exceptions/working/NoWorkingForClassFoundException';
import WorkingAlreadyExistsException from '../exceptions/working/WorkingAlreadyExistsException';
import WorkingWithThatIDNotExistsInClassException from '../exceptions/working/WorkingWithThatIDNotExistsInClassException';
import WorkingWithThatIDNotExistsInClassForYearException from '../exceptions/working/WorkingWithThatIDNotExistsInClassExceptionForYear';


export class WorkingService{

    public classRepository;
    public workingRepository;
    public yearRepository;

    constructor(){
        
        this.classRepository=AppDataSource.getRepository(Class);
        this.workingRepository=AppDataSource.getRepository(Working_time);
        this.yearRepository=AppDataSource.getRepository(Year_Academic);
        
        
    }


    public async getAllWorkings(id_class:number){

        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            const workings= await this.workingRepository 
                .createQueryBuilder("working")
                .leftJoinAndSelect("working.classe","class")
                .leftJoinAndSelect("working.year","year")
                .where("class.id = :id_class",{id_class:classe.id})
                .getMany();
        
            if (workings && workings.length!=0) {
                return workings;
            } 
            else {
                throw new NoWorkingForClassFoundException(classe.name);
            }
        } else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }

        
    
        
    }

    public async createWorking(id_class:number,working:CreateWorkingDto){

            
            const classe =await this.classRepository.findOneBy({id:id_class});

            if (classe) {

                if (!validate_year_academic(working.yearAcademic)) {
                    throw new FormatYearException();
                } 

                const year = await this.yearRepository.findOne({  where:{year:`${working.yearAcademic}`}});

                if (year) {

                    const isAlreadyExist =  await this.workingRepository
                        .createQueryBuilder("working")
                        .leftJoinAndSelect("working.classe","class")
                        .leftJoinAndSelect("working.year","year")
                        .where("class.id = :id",{id:classe.id})
                        .andWhere("year.year = :yearAcademic",{yearAcademic:working.yearAcademic})
                        .getOne();
        
                    if (isAlreadyExist) {
                        throw new WorkingAlreadyExistsException(classe.name,year.year);
                    }  
                    const newWorking = new Working_time();
                    newWorking.working=working.working;
                    newWorking.classe=classe;
                    newWorking.year=year;
                    const created = await this.workingRepository.save(newWorking);

                    console.log(created);
                    if (created) 
                        return created;
                    else
                        throw  new InternalErrorException()                           
                } 
                else {
                    throw  new YearWithThatNameNotExistsException(working.yearAcademic);
                }                  
            } 
            else {
                throw new ClassWithThatIDNotExistsException(id_class);
            }
    }




    public async getWorkingById(id_class:number,id_working:number){
        
        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {

            const working= await this.workingRepository 
                .createQueryBuilder("working")
                .leftJoinAndSelect("working.classe","class")
                .leftJoinAndSelect("working.year","year")
                .where("working.id = :id_working",{id_working:id_working})
                .andWhere("class.id = :id_class",{id_class:classe.id})
                .getOne();
        
            if (working) {
                return working;
            } 
            else {
                throw new WorkingWithThatIDNotExistsInClassException(id_working,classe.name);
            }
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }
        

    }



    public async updateWorking(working:CreateWorkingDto,id_class:number,id_working:number){
    
        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            
            if (!validate_year_academic(working.yearAcademic)) {
                throw new FormatYearException();
            }

            const year = await this.yearRepository.findOne({  where:{year:`${working.yearAcademic}`}});

            if (year) {

                const workingUpdate= await this.workingRepository 
                    .createQueryBuilder("working")
                    .leftJoinAndSelect("working.classe","class")
                    .leftJoinAndSelect("working.year","year")
                    .where("working.id = :id_working",{id_working:id_working})
                    .andWhere("class.id = :id_class",{id_class:classe.id})
                    .andWhere("year.year = :yearAcademic",{yearAcademic:working.yearAcademic})
                    .getOne();



                if (workingUpdate) {

                    
                    workingUpdate.working=working.working;
                    
                    const result = await this.workingRepository.save(workingUpdate);

                    if (result) {
                        return result;
                    } 
                    else {
                        throw new InternalErrorException();
                    }
                    
                } 
                else {
                    throw new WorkingWithThatIDNotExistsInClassForYearException(id_working,classe.name,year.year);
                }


            }
            else {
                throw  new YearWithThatNameNotExistsException(working.yearAcademic);
            }  

        } 
        else{
            throw new ClassWithThatIDNotExistsException(id_class);
        }
    }





    public async deleteWorking(id_class:number,id_working:number){ 

        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            const working= await this.workingRepository 
                .createQueryBuilder("working")
                .leftJoinAndSelect("working.classe","class")
                .where("working.id = :id_working",{id_working:id_working})
                .andWhere("class.id = :id_class",{id_class:classe.id})
                .getOne();
        
            if (working) {
                const result = await this.workingRepository.delete(id_working);
                return id_working;
            } 
            else {
                throw new WorkingWithThatIDNotExistsInClassException(id_working,classe.name);
            }
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }
        

    }




}