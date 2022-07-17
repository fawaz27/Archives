import { AppDataSource } from '../database/AppDataSource';
import { Textbook } from '../models/textbook.entity';
import { Class } from '../models/class.entity';
import { Year_Academic } from '../models/year_academic.entity';
import CreateTextbookDto from '../dto/textbook.dto';
import InternalErrorException from '../exceptions/InternalErrorException';
import TextbookWithThatIDNotExistsException from '../exceptions/textbook/TextbookWithThatIDNotExistsException';
import NoTextbookFoundForClassException from '../exceptions/textbook/NoTextbookFoundForClassException';
import ClassWithThatNameHaveAlreadyTextbookException from '../exceptions/textbook/ClassWithThatNameAlreadyExistsException';
import ClassWithThatIDNotExistsException from '../exceptions/class/ClassWithThatIDNotExistsException';
import YearWithThatNameNotExistsException from '../exceptions/year/YearWithThatNameNotExistsException';
import TextbookWithThatIDNotExistsInClassException from '../exceptions/textbook/TextbookWithThatIDNotExistsInClassException';



export class TextbookService {

    public textbookRepository;
    public classRepository;
    public yearRepository;


    constructor(){
        
        this.textbookRepository=AppDataSource.getRepository(Textbook);
        this.classRepository=AppDataSource.getRepository(Class);
        this.yearRepository=AppDataSource.getRepository(Year_Academic);
        
    }

    public async getAllTextbooks(id_class:number){

        const classe = await this.classRepository.findOneBy({id:id_class}); 

        if (classe) {
            

            const textbooks = await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .leftJoinAndSelect("textbook.year_academic","year")
                    .where("class.id = :id_class",{id_class:id_class})
                    .getMany()
            if (textbooks && textbooks.length!=0) {
                return textbooks;
            } 
            else {
                throw new NoTextbookFoundForClassException(classe.name);
            }

        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }
    }

    public async createTextbook(id_class:number,textbook:CreateTextbookDto){



        const classe = await this.classRepository.findOneBy({id:id_class});
        
        if (classe) {
            
            const year = await this.yearRepository.findOneBy({year:`${textbook.yearAcademic}`});

            if (year) {

                const isAlreadyExist =  await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .leftJoinAndSelect("textbook.year_academic","year")
                    .where("class.id = :id_class",{id_class:classe.id})
                    .andWhere("year.id = :id_year",{id_year:year.id})
                    .getOne();
                if (isAlreadyExist) {

                    throw new ClassWithThatNameHaveAlreadyTextbookException(isAlreadyExist.classe.name,isAlreadyExist.year_academic.year);
                    
                } else {
                       
                        const newTextbook= new Textbook();
                        newTextbook.classe=classe;
                        newTextbook.year_academic=year;
                        newTextbook.title="Textbook - "+classe.name+" - "+year.year;
                        
                        const created = await this.textbookRepository.save(newTextbook);
                        
                        if (created) {
                            return created;
                        } 
                        else {
                            throw new InternalErrorException();
                        }
                }
                

            } 
            else{
                throw new YearWithThatNameNotExistsException(textbook.yearAcademic);
            }
   
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }     
        

    }



    public async getTextbookById(id_class:number,id_textbook:number){

        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            const textbook= await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .leftJoinAndSelect("textbook.year_academic","year_academic")
                    .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                    .andWhere("class.id = :id_class",{id_class:classe.id})
                    .getOne();

            if (textbook) {
                return textbook;
            } 
            else {
                throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
            }
        
        } 
        else {

            throw new ClassWithThatIDNotExistsException(id_class);

        }

    }





    public async updateTextbook(textbook:CreateTextbookDto,id_class:number,id_textbook:number){


        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {

            const textbookUpdate= await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .leftJoinAndSelect("textbook.year_academic","year_academic")
                    .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                    .andWhere("class.id = :id_class",{id_class:classe.id})
                    .getOne();
                if (textbookUpdate) {
                    const year = await this.yearRepository.findOneBy({year:`${textbook.yearAcademic}`});

                    if (year) {
                        const isAlreadyExist =  await this.textbookRepository
                                .createQueryBuilder("textbook")
                                .leftJoinAndSelect("textbook.classe","class")
                                .leftJoinAndSelect("textbook.year_academic","year")
                                .where("class.id = :id_class",{id_class:classe.id})
                                .andWhere("year.id = :id_year",{id_year:year.id})
                                .getOne();

                        if (isAlreadyExist && textbookUpdate.year_academic.year!=textbook.yearAcademic) {

                            throw new ClassWithThatNameHaveAlreadyTextbookException(isAlreadyExist.classe.name,isAlreadyExist.year_academic.year);
                            
                        } 
                        else {

                            textbookUpdate.year_academic=year;
                            textbookUpdate.title = "Textbook - "+classe.name+" - "+year.year;
                            const result = await this.textbookRepository.save(textbookUpdate);
                            if (result) {
                                return result;
                            } 
                            else {
                                throw new InternalErrorException();
                            }
                        }



                    } 
                    else {
                        throw new YearWithThatNameNotExistsException(textbook.yearAcademic); 
                    }  
                    
                    
                } 
                else {
                    throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
                }
                
        } 
        else{
            throw new ClassWithThatIDNotExistsException(id_class);
        }

    }



    
    public async deleteTextbook(id_class:number,id_textbook:number){
        
        const classe =await this.classRepository.findOneBy({id:id_class});

        if (classe) {
            const textbook= await this.textbookRepository 
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                    .andWhere("class.id = :id_class",{id_class:classe.id})
                    .getOne();
        
            if (textbook) {
                const result = await this.textbookRepository.delete(id_textbook);
                return id_textbook;
            } 
            else {
                throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
            }
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }

    }
}

