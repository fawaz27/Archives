
import { AppDataSource } from '../database/AppDataSource';
import CreateTeacherDto from '../dto/teacher.dto';
import InternalErrorException from '../exceptions/InternalErrorException';
import NoUserFoundException from '../exceptions/teacher/NoUserFoundException';
import UserWithThatEmailAlreadyExistsException from '../exceptions/teacher/UserWithThatEmailAlreadyExistsException';
import UserWithThatEmailNotExistsException from '../exceptions/teacher/UserWithThatEmailNotExistsException';
import UserWithThatIDNotExistsException from '../exceptions/teacher/UserWithThatIDNotExistsException';
import { Teacher } from '../models/teacher.entity'
import { Subject } from '../models/subject.entity';
import { Textbook } from '../models/textbook.entity';
import { Session } from '../models/session.entity';
import { Year_Academic } from '../models/year_academic.entity';
import   bcrypt from 'bcrypt';
import TeacherWithIdHasNoSubjectsException from '../exceptions/teacher/TeacherWithIdHasNoSubjectsException';
import NoTexbookFoundForClassForYearException from '../exceptions/textbook/NoTexbookFoundForClassForYearException';
import YearWithThatNameNotExistsException from '../exceptions/year/YearWithThatNameNotExistsException';
import NoSessionFoundForSubjectInClassForYearException from '../exceptions/session/NoSessionFoundForSubjectInClassForYearException';
import CreateSessionDto from '../dto/session.dto';
import SessionWithThatIDNotExistsInTextbookException from '../exceptions/session/SessionWithThatIDNotExistsInTextbookException';
import TeacherWithIdHasNoSubjectsWithIDException from '../exceptions/teacher/TeacherWithIdHasNoSubjectsWithIDException';
import validate_year_academic from '../utils/validator-year_academic';
import FormatYearException from '../exceptions/year/FormatYearException';
import CreateSessionYearDto from '../dto/sessionyear.dto';
import YearIsStringException from '../exceptions/year/YearIsStringException';

export class TeacherService{

    public teacherRepository;
    public subjectRepository;
    public textbookRepository;
    public sessionRepository;
    public yearRepository;
    
    constructor(){
        
        this.teacherRepository=AppDataSource.getRepository(Teacher);
        this.subjectRepository=AppDataSource.getRepository(Subject);
        this.textbookRepository=AppDataSource.getRepository(Textbook);
        this.sessionRepository=AppDataSource.getRepository(Session);
        this.yearRepository=AppDataSource.getRepository(Year_Academic);
        
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



    public async getSubjectsTeacher(id:number){
        const user = await this.teacherRepository.findOneBy({id:id});
        
        if (user) {


            
            const subjects= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.teacher","teacher")
                .leftJoinAndSelect("subject.classe","classe")
                .where("teacher.id = :id_teacher",{id_teacher:id})
                .getMany();

            if (subjects && subjects.length!=0) {
                return subjects;
            } 
            else {
                throw new TeacherWithIdHasNoSubjectsException(id)
            }
        } 
        else {
            throw new UserWithThatIDNotExistsException(id);
        }

    }


    public async getSessionsTeacher(id:number,id_subject:number,year_academic:any){

        const user = await this.teacherRepository.findOneBy({id:id});
        
        if (user) {


            
            const subject= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.teacher","teacher")
                .leftJoinAndSelect("subject.classe","classe")
                .where("teacher.id = :id_teacher",{id_teacher:id})
                .andWhere("subject.id = :id_subject",{id_subject:id_subject})
                .getOne();
                console.log(subject);
                

            if (subject) {

                // if(year_academic==undefined){
                //     let year_now = (new Date()).getFullYear();
                //     year_academic=year_now-1+'-'+year_now;
                // }

                if (typeof(year_academic)!="string") {
                    throw new YearIsStringException()
                }                
                else if(!validate_year_academic(year_academic)){
                    throw  new FormatYearException();
                }              

                const year = await this.yearRepository.findOne({  where:{year:`${year_academic}`}});

                if (year) {

                    const textbook = await this.textbookRepository
                        .createQueryBuilder("textbook")
                        .leftJoinAndSelect("textbook.classe","class")
                        .leftJoinAndSelect("textbook.year_academic","year")
                        .where("year.year = :year_academic",{year_academic:year_academic})
                        .andWhere("class.id = :id_class",{id_class:subject.classe.id})
                        .getOne();

                    if (textbook) {

                        const sessions = await this.sessionRepository
                            .createQueryBuilder("session")
                            .leftJoinAndSelect("session.subject","subject")
                            .leftJoinAndSelect("session.textbook","textbook")
                            .where("subject.id = :id_subject",{id_subject:subject.id})
                            .andWhere("textbook.id = :id_textbook",{id_textbook:textbook.id})
                            .getMany();

                        if (sessions && sessions.length!=0) {
                            return sessions;
                        } 
                        else {
                            throw new NoSessionFoundForSubjectInClassForYearException(subject.name,subject.classe.name,year_academic);
                        }                    
                    } 
                    else{
                        throw new NoTexbookFoundForClassForYearException(subject.classe.name,year_academic);
                    }
                        
                } 
                else {
                    throw  new YearWithThatNameNotExistsException(year_academic);
                }      
            } 
            else {
                throw new TeacherWithIdHasNoSubjectsWithIDException(id,id_subject);
            }
        } 
        else {
            throw new UserWithThatIDNotExistsException(id);
        }



    }


    public async addSession(id:number,id_subject:number,year_academic:string,session:CreateSessionYearDto){

        const user = await this.teacherRepository.findOneBy({id:id});
        
        if (user) {


            
            const subject= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.teacher","teacher")
                .leftJoinAndSelect("subject.classe","classe")
                .where("teacher.id = :id_teacher",{id_teacher:id})
                .andWhere("subject.id = :id_subject",{id_subject:id_subject})
                .getOne();

            if (subject) {
                
                
                
                if(!validate_year_academic(year_academic)){
                    throw new FormatYearException();
                }

                const year = await this.yearRepository.findOne({  where:{year:`${year_academic}`}});

                if (year) {

                    const textbook = await this.textbookRepository
                        .createQueryBuilder("textbook")
                        .leftJoinAndSelect("textbook.classe","class")
                        .leftJoinAndSelect("textbook.year_academic","year")
                        .where("year.year = :year_academic",{year_academic:year_academic})
                        .andWhere("class.id = :id_class",{id_class:subject.classe.id})
                        .getOne();

                    if (textbook) {
                        const newSession = new Session();
                        newSession.title=session.title;
                        newSession.date=session.date;
                        newSession.annex_document=session.annex_document;
                        newSession.description=session.description;
                        newSession.duration=session.duration;
                        newSession.summary_course=session.summary_course;
                        newSession.point_of_presence=session.point_of_presence;
                        newSession.start_time=session.start_time;
                        newSession.end_time=session.end_time;
                        newSession.subject=subject;
                        newSession.textbook=textbook;

                        const created = await this.sessionRepository.save(newSession);

                        if (created) {
                            return created;
                            
                        } 
                        else {
                            throw new InternalErrorException();
                        }
                    }
                    else{
                        throw new NoTexbookFoundForClassForYearException(subject.classe.name,year_academic);
                    }
                        
                } 
                else {
                    throw  new YearWithThatNameNotExistsException(year_academic);
                }      
            } 
            else {
                throw new TeacherWithIdHasNoSubjectsException(id)
            }
        } 
        else {
            throw new UserWithThatIDNotExistsException(id);
        }

        
    }


    public async updateSession(id:number,id_subject:number,year_academic:string,id_session:number,session:CreateSessionDto){

        const user = await this.teacherRepository.findOneBy({id:id});
        
        if (user) {


            
            const subject= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.teacher","teacher")
                .leftJoinAndSelect("subject.classe","classe")
                .where("teacher.id = :id_teacher",{id_teacher:id})
                .andWhere("subject.id = :id_subject",{id_subject:id_subject})
                .getOne();

            if (subject) {

                if(!validate_year_academic(year_academic)){
                    throw new FormatYearException();
                }

                const year = await this.yearRepository.findOne({  where:{year:`${year_academic}`}});

                if (year) {

                    const textbook = await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .leftJoinAndSelect("textbook.year_academic","year")
                    .where("year.year = :year_academic",{year_academic:year_academic})
                    .andWhere("class.id = :id_class",{id_class:subject.classe.id})
                    .getOne();

                    if (textbook) {

                        const sessionUpdate = await this.sessionRepository
                            .createQueryBuilder("session")
                            .leftJoinAndSelect("session.subject","subject")
                            .leftJoinAndSelect("session.textbook","textbook")
                            .where("session.id = :id_session",{id_session:id_session})
                            .andWhere("textbook.id = :id_textbook",{id_textbook:textbook.id})
                            .andWhere("subject.id = :id_subject",{id_subject:subject.id})
                            .getOne();

                        if (sessionUpdate) {
                            sessionUpdate.title=session.title;
                            sessionUpdate.date=session.date;
                            sessionUpdate.annex_document=session.annex_document;
                            sessionUpdate.description=session.description;
                            sessionUpdate.duration=session.duration;
                            sessionUpdate.summary_course=session.summary_course;
                            sessionUpdate.point_of_presence=session.point_of_presence;
                            sessionUpdate.start_time=session.start_time;
                            sessionUpdate.end_time=session.end_time;

                            const result = await this.sessionRepository.save(sessionUpdate);

                            if (result) {
                                return result;
                            } 
                            else {
                                throw new InternalErrorException();
                            }
                        } 
                        else {
                            throw new SessionWithThatIDNotExistsInTextbookException(id_session,textbook.title);
                        }

                    }
                    else{
                        throw new NoTexbookFoundForClassForYearException(subject.classe.name,year_academic);
                    }
                        
                } 
                else {
                    throw  new YearWithThatNameNotExistsException(year_academic);
                }      
            } 
            else {
                throw new TeacherWithIdHasNoSubjectsException(id)
            }
        } 
        else {
            throw new UserWithThatIDNotExistsException(id);
        }

    }


    public async deleteSession(id:number,id_subject:number,year_academic:any,id_session:number){

        const user = await this.teacherRepository.findOneBy({id:id});
        
        if (user) {


            
            const subject= await this.subjectRepository 
                .createQueryBuilder("subject")
                .leftJoinAndSelect("subject.teacher","teacher")
                .leftJoinAndSelect("subject.classe","classe")
                .where("teacher.id = :id_teacher",{id_teacher:id})
                .andWhere("subject.id = :id_subject",{id_subject:id_subject})
                .getOne();

            if (subject) {

                if (typeof(year_academic)!="string") {
                    throw new YearIsStringException()
                } 
                else if(!validate_year_academic(year_academic)){
                    throw new FormatYearException();
                }

                const year = await this.yearRepository.findOne({  where:{year:`${year_academic}`}});

                if (year) {

                    const textbook = await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .leftJoinAndSelect("textbook.year_academic","year")
                    .where("year.year = :year_academic",{year_academic:year_academic})
                    .andWhere("class.id = :id_class",{id_class:subject.classe.id})
                    .getOne();

                    if (textbook) {

                        const session = await this.sessionRepository
                            .createQueryBuilder("session")
                            .leftJoinAndSelect("session.subject","subject")
                            .leftJoinAndSelect("session.textbook","textbook")
                            .where("session.id = :id_session",{id_session:id_session})
                            .andWhere("textbook.id = :id_textbook",{id_textbook:textbook.id})
                            .andWhere("subject.id = :id_subject",{id_subject:subject.id})
                            .getOne();

                        if (session) {
                            const result = await this.sessionRepository.delete(id_session);
                            return id_session;           
                        } 
                        else {
                            throw new SessionWithThatIDNotExistsInTextbookException(id_session,textbook.title);
                        }

                    }
                    else{
                        throw new NoTexbookFoundForClassForYearException(subject.classe.name,year_academic);
                    }
                        
                } 
                else {
                    throw  new YearWithThatNameNotExistsException(year_academic);
                }      
            } 
            else {
                throw new TeacherWithIdHasNoSubjectsException(id)
            }
        } 
        else {
            throw new UserWithThatIDNotExistsException(id);
        }
    }






    




}