import express from 'express';
import{Request,Response,NextFunction} from 'express';
import { ClassService } from '../services/class.service';
import validationMiddleware from '../middlewares/validationMiddleware';
import CreateClasseDto from '../dto/class.dto';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';

export class ClassController{

    public path = '/classes'
    public router =express.Router();
    public classService:ClassService;

    constructor(){      
        this.classService = new ClassService();
        this.initializeRoutes();
    }


    private initializeRoutes()
    {
        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.GetAllClasses)
            .post(this.path,validationMiddleware(CreateClasseDto),this.CreateClass);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id`,this.GetClassById)
            .put(`${this.path}/:id`,validationMiddleware(CreateClasseDto),this.UpdateClass)
            .delete(`${this.path}/:id`,this.DeleteClass)


        
        
    }

    public GetAllClasses = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        try {
            const result = await this.classService.GetAllClasses();
            response.send(result);
        } catch (error) {
            next(error);
        }
    }

    public CreateClass = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const ClassData:CreateClasseDto =request.body;

        try {
            
            const created= await this.classService.CreateClass(ClassData);
            response.send(created);
        } catch (error) {

            next(error);            
        }
    }


    public GetClassById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;
        try {
            const classe = await this.classService.GetClasseById(Number(id));
            response.send(classe);
        } catch (error) {
            next(error);
        }

    }

    

    public UpdateClass = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id = request.params.id;
        const ClassData:CreateClasseDto = request.body;

        try {
           const result = await this.classService.UpdateClasse(ClassData,Number(id));
           response.send(result);        
        } catch (error) {
            next(error);
        }
    }


    public DeleteClass = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id = request.params.id;
        try {
            const result = await this.classService.DeleteClasse(Number(id)) ;
            response.send(`Class with id ${id} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }




}