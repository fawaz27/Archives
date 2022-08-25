import { AppDataSource } from '../database/AppDataSource';
import { Session } from '../models/session.entity';
import { Textbook } from '../models/textbook.entity';
import { Class } from '../models/class.entity';
import { Task } from '../models/task.entity';
import CreateTaskDto from '../dto/task.dto';
import InternalErrorException from '../exceptions/InternalErrorException';
import NoTaskFoundInSessionException from '../exceptions/task/NoTaskFoundInSessionException';
import SessionWithThatIDNotExistsException from '../exceptions/session/SessionWithThatIDNotExistsException';
import TaskWithThatIDNotExistsInSessionException from '../exceptions/task/TaskWithThatIDNotExistsInSessionException';


export class TaskService{
    public sessionRepository;
    public classRepository;
    public taskRepository;
    public textbookRepository;

    constructor(){
        this.classRepository=AppDataSource.getRepository(Class);
        this.sessionRepository=AppDataSource.getRepository(Session);
        this.taskRepository=AppDataSource.getRepository(Task);
        this.textbookRepository=AppDataSource.getRepository(Textbook);
        
        
       
    }

    public async getAllTasksInSession(id_session:number){

    

        const session = await  this.sessionRepository
            .createQueryBuilder("session")
            .leftJoinAndSelect("session.textbook","textbook")
            .where("session.id = :id_session",{id_session:id_session})
            .getOne();

        if (session) {
        
            const tasks = await this.taskRepository
                    .createQueryBuilder("task")
                    .leftJoinAndSelect("task.session","session")
                    .where("session.id = :id_session",{id_session:session.id})
                    .getMany();

            if (tasks && tasks.length!=0) {
                return tasks;
            
            } 
            else {
                    throw new NoTaskFoundInSessionException(session.id);
            }
                

        } 
        else {
            throw new SessionWithThatIDNotExistsException(id_session);  
        }   


    }

    public async createTask(id_session:number,task:CreateTaskDto){

       

        const session = await  this.sessionRepository
            .createQueryBuilder("session")
            .leftJoinAndSelect("session.textbook","textbook")
            .where("session.id = :id_session",{id_session:id_session})
            .getOne();

        if (session) {
            
            const newTask =new Task();
            newTask.name=task.name;
            newTask.title=task.title;
            newTask.type=task.type;
            newTask.createdAt=task.createdAt;
            newTask.date_given=task.date_given;
            newTask.date_submission=task.date_submission;
            newTask.statement=task.statement;
            newTask.document_annex=task.document_annex;

            newTask.session=session;

            const created = await this.taskRepository.save(newTask);

            if (created) {
                return created;
            } 
            else {
                throw new InternalErrorException();
            }
        } 
        else {
            throw new SessionWithThatIDNotExistsException(id_session);  
        }

    
           

    }



    public async getTaskById(id_session:number,id_task:number){
        

        

                const session = await  this.sessionRepository
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.textbook","textbook")
                    .where("session.id = :id_session",{id_session:id_session})
                    .getOne();


                if (session) {

                    const task = await this.taskRepository
                            .createQueryBuilder("task")
                            .leftJoinAndSelect("task.session","session")
                            .andWhere("task.id = :id_task",{id_task:id_task})
                            .where("session.id = :id_session",{id_session:session.id})
                            .getOne();

                    if (task) {
                        return task;
                    } 
                    else {
                        throw new TaskWithThatIDNotExistsInSessionException(id_task,id_session);
                    }

                } 
                else {
                    throw new SessionWithThatIDNotExistsException(id_session);  
                }

            
            
        

    }


    public async updateTask(id_session:number,id_task:number,task:CreateTaskDto){
        

        

                const session = await  this.sessionRepository
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.textbook","textbook")
                    .where("session.id = :id_session",{id_session:id_session})
                    .getOne();

                if (session) {


                    const taskUpdate = await this.taskRepository
                            .createQueryBuilder("task")
                            .leftJoinAndSelect("task.session","session")
                            .andWhere("task.id = :id_task",{id_task:id_task})
                            .where("session.id = :id_session",{id_session:session.id})
                            .getOne();


                    if (taskUpdate) {
                        taskUpdate.name=task.name;
                        taskUpdate.title=task.title;
                        taskUpdate.type=task.type;
                        taskUpdate.createdAt=task.createdAt;
                        taskUpdate.date_given=task.date_given;
                        taskUpdate.date_submission=task.date_submission;
                        taskUpdate.statement=task.statement;
                        taskUpdate.document_annex=task.document_annex;

                        const result = await this.taskRepository.save(taskUpdate);

                        if (result) {
                            return result;
                        } 
                        else {
                            throw new InternalErrorException();
                        }

                        
                    } 
                    else {
                        throw new TaskWithThatIDNotExistsInSessionException(id_task,id_session)
                    }

                } 
                else {
                    throw new SessionWithThatIDNotExistsException(id_session);  
                }

            
        

        

    }

    public async deleteTask(id_session:number,id_task:number){
        

    

                const session = await  this.sessionRepository
                    .createQueryBuilder("session")
                    .leftJoinAndSelect("session.textbook","textbook")
                    .where("session.id = :id_session",{id_session:id_session})
                    .getOne();


                if (session) {


                    const task = await this.taskRepository
                            .createQueryBuilder("task")
                            .leftJoinAndSelect("task.session","session")
                            .andWhere("task.id = :id_task",{id_task:id_task})
                            .where("session.id = :id_session",{id_session:session.id})
                            .getOne();

                    if (task) {
                        const result = await this.taskRepository.delete(id_task);
                            return id_task;
                    } 
                    else {
                        
                    }


                } 
                else {
                    throw new SessionWithThatIDNotExistsException(id_session);  
                }

            } 
            

    
   

}



