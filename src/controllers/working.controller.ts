import express from 'express';
import{Request,Response,NextFunction} from 'express';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import { WorkingService } from '../services/working.service';
import CreateWorkingDto from '../dto/working.dto';


export class WorkingController{

    public path = '/classes/:id_class/workings'
    public router =express.Router();
    public workingService:WorkingService;
    

    constructor(){      
        this.workingService = new WorkingService();
        this.initializeRoutes();
    }

    private initializeRoutes()
    {
        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .put(`${this.path}/:id_working`,validationMiddleware(CreateWorkingDto),this.updateWorking)
            .post(this.path,validationMiddleware(CreateWorkingDto),this.createWorking)
            .delete(`${this.path}/:id_working`,this.deleteWorking);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.getAllWorkings)
            .get(`${this.path}/:id_working`,this.getWorkingById)   
        
    }


    public getAllWorkings = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        try {
            const result = await this.workingService.getAllWorkings(Number(id_class));
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public createWorking = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id_class = request.params.id_class;
        const WorkingData:CreateWorkingDto =request.body;

        try {
            
            const created= await this.workingService.createWorking(Number(id_class),WorkingData);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public getWorkingById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id_class = request.params.id_class;
        const id_working = request.params.id_working;
        try {
            const working = await this.workingService.getWorkingById(Number(id_class),Number(id_working));
            response.status(200).send(working);
        } catch (error) {
            next(error);
        }

    }

    public updateWorking = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id_class = request.params.id_class;
        const id_working = request.params.id_working;
        const WorkingData:CreateWorkingDto = request.body;

        try {
           const result = await this.workingService.updateWorking(WorkingData,Number(id_class),Number(id_working));
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteWorking = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_class = request.params.id_class;
        const id_working = request.params.id_working;
        try {
            const result = await this.workingService.deleteWorking(Number(id_class),Number(id_working)) ;
            response.status(200).send(`Working with id ${result} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }







}