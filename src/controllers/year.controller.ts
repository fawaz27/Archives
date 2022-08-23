import express from 'express';
import{Request,Response,NextFunction} from 'express';
import { YearService } from '../services/year.service';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateYearDto from '../dto/year_academic.dto';

export class YearController{

    public path = '/year_academic'
    public router =express.Router();
    public yearService:YearService;


    constructor(){      
        this.yearService = new YearService();
        this.initializeRoutes();
    }


    private initializeRoutes()
    {
        this.router
            // .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            // .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.getAllYears)
            .post(this.path,validationMiddleware(CreateYearDto),this.createYear);

        this.router
            // .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            // .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id_year`,this.getYearById)
            .put(`${this.path}/:id_year`,validationMiddleware(CreateYearDto),this.updateYear)
            .delete(`${this.path}/:id_year`,this.deleteYear)


        
        
    }



    public getAllYears = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        
        try {
            const result = await this.yearService.getAllYears();
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public createYear = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            
        const YearData:CreateYearDto =request.body;

        try {
            
            const created= await this.yearService.createYear(YearData);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public getYearById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        
        const id_year = request.params.id_year;
        try {
            const year = await this.yearService.getYearById(Number(id_year));
            response.status(200).send(year);
        } catch (error) {
            next(error);
        }

    }

    public updateYear = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        
        const id_year = request.params.id_year;
        const YearData:CreateYearDto = request.body;

        try {
           const result = await this.yearService.updateYear(YearData,Number(id_year));
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteYear = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        
        const id_year = request.params.id_year;
        try {
            const result = await this.yearService.deleteYear(Number(id_year)) ;
            response.status(200).send(`Year with id ${id_year} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }


}