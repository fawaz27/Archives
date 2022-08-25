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
            .get(this.path,this.getAllClasses)
            .post(this.path,validationMiddleware(CreateClasseDto),this.createClass);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id`,this.getClassById)
            .put(`${this.path}/:id`,validationMiddleware(CreateClasseDto),this.updateClass)
            .delete(`${this.path}/:id`,this.deleteClass)


        
        
    }

    public getAllClasses = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        try {
            
            const result = await this.classService.getAllClasses();
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

    public createClass = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const ClassData:CreateClasseDto =request.body;
        

        try {
            
            const created= await this.classService.createClass(ClassData);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public getClassById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;
        try {
            const classe = await this.classService.getClasseById(Number(id));
            response.status(200).send(classe);
        } catch (error) {
            next(error);
        }

    }

    

    public updateClass = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id =1;
        const ClassData:CreateClasseDto = request.body;

        try {
           const result = await this.classService.updateClasse(ClassData,Number(id));
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteClass = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id = request.params.id;
        try {
            const result = await this.classService.deleteClasse(Number(id)) ;
            response.status(200).send(`Class with id ${id} has been deleted`);
            
        } catch (error) {
            next(error);
        }
    }




}