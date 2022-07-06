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
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.GetAllYears)
            .post(this.path,validationMiddleware(CreateYearDto),this.CreateYear);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id_year`,this.GetYearById)
            .put(`${this.path}/:id_year`,validationMiddleware(CreateYearDto),this.UpdateYear)
            .delete(`${this.path}/:id_year`,this.DeleteYear)


        
        
    }



    public GetAllYears = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        
        try {
            const result = await this.yearService.GetAllYears();
            response.send(result);
        } catch (error) {
            next(error);
        }
    }


    public CreateYear = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        
        const YearData:CreateYearDto =request.body;

        try {
            
            const created= await this.yearService.CreateYear(YearData);
            response.send(created);
        } catch (error) {

            next(error);            
        }
    }


    public GetYearById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        
        const id_year = request.params.id_year;
        try {
            const year = await this.yearService.GetYearById(Number(id_year));
            response.send(year);
        } catch (error) {
            next(error);
        }

    }

    public UpdateYear = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        
        const id_year = request.params.id_year;
        const YearData:CreateYearDto = request.body;

        try {
           const result = await this.yearService.UpdateYear(YearData,Number(id_year));
           response.send(result);        
        } catch (error) {
            next(error);
        }
    }


    public DeleteYear = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        
        const id_year = request.params.id_year;
        try {
            const result = await this.yearService.DeleteYear(Number(id_year)) ;
            response.send(`Year with id ${id_year} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }


}