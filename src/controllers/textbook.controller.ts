import express from 'express';
import{Request,Response,NextFunction} from 'express';
import { TextbookService } from '../services/textbook.service';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateTextbookDto from '../dto/textbook.dto';

export class TextbookController{

    public path = '/classes/:id_class/textbooks'
    public router =express.Router();
    public textbookService:TextbookService;


    constructor(){      
        this.textbookService = new TextbookService();
        this.initializeRoutes();
    }


    private initializeRoutes()
    {
        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.getAllTextbooks)
            .post(this.path,validationMiddleware(CreateTextbookDto),this.createTextbook);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id_textbook`,this.getTextbookById)
            .put(`${this.path}/:id_textbook`,validationMiddleware(CreateTextbookDto),this.updateTextbook)
            .delete(`${this.path}/:id_textbook`,this.deleteTextbook)


        
        
    }



    public getAllTextbooks = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        try {
            const result = await this.textbookService.getAllTextbooks(Number(id_class));
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public createTextbook = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id_class = request.params.id_class;
        const TextbookData:CreateTextbookDto =request.body;

        try {
            
            const created= await this.textbookService.createTextbook(Number(id_class),TextbookData);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public getTextbookById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        try {
            const textbook = await this.textbookService.getTextbookById(Number(id_class),Number(id_textbook));
            response.status(200).send(textbook);
        } catch (error) {
            next(error);
        }

    }

    public updateTextbook = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const TextbookData:CreateTextbookDto = request.body;

        try {
           const result = await this.textbookService.updateTextbook(TextbookData,Number(id_class),Number(id_textbook));
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteTextbook = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        try {
            const result = await this.textbookService.deleteTextbook(Number(id_class),Number(id_textbook)) ;
            response.status(200).send(`Textbook with id ${id_textbook} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }


}