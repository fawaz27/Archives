import { AppDataSource } from '../database/AppDataSource';
import { Session } from '../models/session.entity';
import { Subject } from '../models/subject.entity';
import { Textbook } from '../models/textbook.entity';
import { Class } from '../models/class.entity';
import CreateSessionDto from '../dto/session.dto';
import ClassWithThatIDNotExistsException from '../exceptions/class/ClassWithThatIDNotExistsException';
import NoSessionFoundForSubjectException from '../exceptions/session/NoSessionFoundForSubjectException';
import NoSessionFoundInTextbookException from '../exceptions/session/NoSessionFoundInTextbookException';
import InternalErrorException from '../exceptions/InternalErrorException';
import SubjectWithThatIDNotExistsInClassException from '../exceptions/subject/SubjectWithThatIDNotExistsInClassException';
import TextbookWithThatIDNotExistsInClassException from '../exceptions/textbook/TextbookWithThatIDNotExistsInClassException';
import SessionWithThatIDNotExistsInTextbookException from '../exceptions/session/SessionWithThatIDNotExistsInTextbookException';



export class SessionService{

    public sessionRepository;
    public subjectRepository;
    public textbookRepository;
    public classRepository;

    constructor(){
        
        this.sessionRepository=AppDataSource.getRepository(Session);
        this.subjectRepository=AppDataSource.getRepository(Subject);
        this.textbookRepository=AppDataSource.getRepository(Textbook);
        this.classRepository=AppDataSource.getRepository(Class);
        
    }

    public async getAllSessionsSubject(id_class:number,id_textbook:number,id_subject:number){

        const classe = await this.classRepository.findOneBy({id:id_class}); 

        if (classe) {
            
            const textbook = await this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe","class")
                .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                .andWhere("class.id = :id_class",{id_class:classe.id})
                .getOne();
            if (textbook) {

                const subject = await AppDataSource.getRepository(Subject)
                        .createQueryBuilder("subject")
                        .leftJoinAndSelect("subject.classe","class")
                        .where("subject.id = :id_subject",{id_subject:id_subject})
                        .andWhere("class.id = :id_class",{id_class:classe.id})
                        .getOne();

                if (subject) {

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
                       
                        throw new NoSessionFoundForSubjectException(subject.name,classe.name);

                        
                    }


                    
                } 
                else {
                    throw new SubjectWithThatIDNotExistsInClassException(id_subject,classe.name);
                }
                
            } 
            else {
                throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
            }
            
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }


        
    
        
    }

    public async getAllSessions(id_class:number,id_textbook:number){


        const classe = await this.classRepository.findOneBy({id:id_class}); 

        if (classe) {
            
            const textbook = await this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe","class")
                .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                .andWhere("class.id = :id_class",{id_class:classe.id})
                .getOne();

            if (textbook) {


                const sessions = await this.sessionRepository   
                        .createQueryBuilder("session")
                        .leftJoinAndSelect("session.subject","subject")
                        .leftJoinAndSelect("session.textbook","textbook")
                        .where("textbook.id = :id_textbook",{id_textbook:textbook.id})
                        .getMany();

                if (sessions && sessions.length!=0) {
                    return sessions;
                
                } 
                else {
                    
                    throw new NoSessionFoundInTextbookException(textbook.title,classe.name);

                    
                }
                
            } 
            else {
                throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
            }
            
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }

    }


    public async createSession(id_class:number,id_textbook:number,id_subject:number,session:CreateSessionDto){

        const classe = await this.classRepository.findOneBy({id:id_class}); 

        if (classe) {
            
            const textbook = await this.textbookRepository
                .createQueryBuilder("textbook")
                .leftJoinAndSelect("textbook.classe","class")
                .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                .andWhere("class.id = :id_class",{id_class:classe.id})
                .getOne();
            if (textbook) {

                const subject = await AppDataSource.getRepository(Subject)
                        .createQueryBuilder("subject")
                        .leftJoinAndSelect("subject.classe","class")
                        .where("subject.id = :id_subject",{id_subject:id_subject})
                        .andWhere("class.id = :id_class",{id_class:classe.id})
                        .getOne();

                if (subject) {
                    
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
                else {
                    throw new SubjectWithThatIDNotExistsInClassException(id_subject,classe.name);
                }
                
            } 
            else {
                throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
            }
            
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }



    }

    public async getSessionById(id_class:number,id_textbook:number,id_session:number){

        const classe = await this.classRepository.findOneBy({id:id_class}); 

        if (classe) {
            
            const textbook = await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                    .andWhere("class.id = :id_class",{id_class:classe.id})
                    .getOne();

            if (textbook) {
                

                const session = await this.sessionRepository
                        .createQueryBuilder("session")
                        .leftJoinAndSelect("session.subject","subject")
                        .leftJoinAndSelect("session.textbook","textbook")
                        .where("session.id = :id_session",{id_session:id_session})
                        .andWhere("textbook.id = :id_textbook",{id_textbook:textbook.id})
                        .getOne();

                if (session) {
                    return session;
                } 
                else {
                    throw new SessionWithThatIDNotExistsInTextbookException(id_session,textbook.title);
                }

                

            } 
            else {
                throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
            }
                
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }


    }


    public async updateSession(id_class:number,id_textbook:number,id_session:number,session:CreateSessionDto){
    

              
        const classe = await this.classRepository.findOneBy({id:id_class}); 

        if (classe) {
            
            const textbook = await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                    .andWhere("class.id = :id_class",{id_class:classe.id})
                    .getOne();

            if (textbook) {
                

                const sessionUpdate = await this.sessionRepository
                        .createQueryBuilder("session")
                        .leftJoinAndSelect("session.subject","subject")
                        .leftJoinAndSelect("session.textbook","textbook")
                        .where("session.id = :id_session",{id_session:id_session})
                        .andWhere("textbook.id = :id_textbook",{id_textbook:textbook.id})
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
            else {
                throw new TextbookWithThatIDNotExistsInClassException(id_textbook,classe.name);
            }
                
        } 
        else {
            throw new ClassWithThatIDNotExistsException(id_class);
        }

    }



    public async deleteSession(id_class:number,id_textbook:number,id_session:number){


        const classe = await this.classRepository.findOneBy({id:id_class}); 

        if (classe) {
            
            const textbook = await this.textbookRepository
                    .createQueryBuilder("textbook")
                    .leftJoinAndSelect("textbook.classe","class")
                    .where("textbook.id = :id_textbook",{id_textbook:id_textbook})
                    .andWhere("class.id = :id_class",{id_class:classe.id})
                    .getOne();

            if (textbook) {
                

                const session = await this.sessionRepository
                        .createQueryBuilder("session")
                        .leftJoinAndSelect("session.subject","subject")
                        .leftJoinAndSelect("session.textbook","textbook")
                        .where("session.id = :id_session",{id_session:id_session})
                        .andWhere("textbook.id = :id_textbook",{id_textbook:textbook.id})
                        .getOne();

                if (session) {
                    
                    const result = await this.sessionRepository.delete(id_session);
                    return id_session;

                } 
                else {
                    throw new SessionWithThatIDNotExistsInTextbookException(id_session,textbook.title);
                }

                    

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