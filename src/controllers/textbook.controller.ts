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
            .get(this.path,this.GetAllTextbooks)
            .post(this.path,validationMiddleware(CreateTextbookDto),this.CreateTextbook);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id_textbook`,this.GetTextbookById)
            .put(`${this.path}/:id_textbook`,validationMiddleware(CreateTextbookDto),this.UpdateTextbook)
            .delete(`${this.path}/:id_textbook`,this.DeleteTextbook)


        
        
    }



    public GetAllTextbooks = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        try {
            const result = await this.textbookService.GetAllTextbooks(Number(id_class));
            response.send(result);
        } catch (error) {
            next(error);
        }
    }


    public CreateTextbook = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id_class = request.params.id_class;
        const TextbookData:CreateTextbookDto =request.body;

        try {
            
            const created= await this.textbookService.CreateTextbook(Number(id_class),TextbookData);
            response.send(created);
        } catch (error) {

            next(error);            
        }
    }


    public GetTextbookById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        try {
            const textbook = await this.textbookService.GetTextbookById(Number(id_class),Number(id_textbook));
            response.send(textbook);
        } catch (error) {
            next(error);
        }

    }

    public UpdateTextbook = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const TextbookData:CreateTextbookDto = request.body;

        try {
           const result = await this.textbookService.UpdateTextbook(TextbookData,Number(id_class),Number(id_textbook));
           response.send(result);        
        } catch (error) {
            next(error);
        }
    }


    public DeleteTextbook = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        try {
            const result = await this.textbookService.DeleteTextbook(Number(id_class),Number(id_textbook)) ;
            response.send(`Textbook with id ${id_textbook} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }


}