import express from 'express';
import{Request,Response,NextFunction} from 'express';
import { TaskService } from '../services/task.service';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateTaskDto from '../dto/task.dto';

export class TaskController{

    public path = '/classes/:id_class/textbooks/:id_textbook/sessions/:id_session/tasks'
    public router =express.Router();
    public taskService:TaskService;


    constructor(){      
        this.taskService = new TaskService();
        this.initializeRoutes();
    }


    private initializeRoutes()
    {
        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.GetAllTasks)
            .post(this.path,validationMiddleware(CreateTaskDto),this.CreateTask);

        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id_task`,this.GetTaskById)
            .put(`${this.path}/:id_task`,validationMiddleware(CreateTaskDto),this.UpdateTask)
            .delete(`${this.path}/:id_task`,this.DeleteTask)


        
        
    }



    public GetAllTasks = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        try {
            const result = await this.taskService.GetAllTasksInSession(Number(id_class),Number(id_textbook),Number(id_session));
            response.send(result);
        } catch (error) {
            next(error);
        }
    }


    public CreateTask = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        const TextbookData:CreateTaskDto =request.body;

        try {
            
            const created= await this.taskService.CreateTask(Number(id_class),Number(id_textbook),Number(id_session),TextbookData);
            response.send(created);
        } catch (error) {

            next(error);            
        }
    }


    public GetTaskById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        const id_task = request.params.id_task;
        try {
            const task = await this.taskService.GetTaskById(Number(id_class),Number(id_textbook),Number(id_session),Number(id_task));
            response.send(task);
        } catch (error) {
            next(error);
        }

    }

    public UpdateTask = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        const id_task = request.params.id_task;
        const TextbookData:CreateTaskDto = request.body;

        try {
           const result = await this.taskService.UpdateTask(Number(id_class),Number(id_textbook),Number(id_session),Number(id_task),TextbookData);
           response.send(result);        
        } catch (error) {
            next(error);
        }
    }


    public DeleteTask = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        const id_task = request.params.id_task;
        try {
            const result = await this.taskService.DeleteTask(Number(id_class),Number(id_textbook),Number(id_session),Number(id_task)) ;
            response.send(`Task with id ${id_task} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }

}