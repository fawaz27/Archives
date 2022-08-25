import express from 'express';
import{Request,Response,NextFunction} from 'express';
import { SessionService } from '../services/session.service';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateSessionDto from '../dto/session.dto';


export class SessionController{

    public path = '/textbooks/:id_textbook'
    public router =express.Router();
    public sessionService:SessionService;


    constructor(){      
        this.sessionService = new SessionService();
        this.initializeRoutes();
    }


    private initializeRoutes()
    {
        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/subjects/:id_subject/sessions`,this.getAllSessionsSubject)
            .get(`${this.path}/sessions`,this.getAllSessions)
            .post(`${this.path}/subjects/:id_subject/sessions`,validationMiddleware(CreateSessionDto),this.createSession);

        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/sessions/:id_session`,this.getSessionById)
            .put(`${this.path}/sessions/:id_session`,validationMiddleware(CreateSessionDto),this.updateSession)
            .delete(`${this.path}/sessions/:id_session`,this.deleteSession);     
        
    }



    public getAllSessionsSubject = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
       
        const id_subject = request.params.id_subject;
        const id_textbook = request.params.id_textbook;
        try {
            const result = await this.sessionService.getAllSessionsSubject(Number(id_textbook),Number(id_subject));
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public getAllSessions = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        
        const id_textbook = request.params.id_textbook;
        try {
            const result = await this.sessionService.getAllSessions(Number(id_textbook));
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public createSession = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        
        const id_subject = request.params.id_subject;
        const id_textbook = request.params.id_textbook;
        const SessionData:CreateSessionDto =request.body;

        try {
            
            const created= await this.sessionService.createSession(Number(id_textbook),Number(id_subject),SessionData);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public getSessionById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        try {
            const session = await this.sessionService.getSessionById(Number(id_textbook),Number(id_session));
            response.status(200).send(session);
        } catch (error) {
            next(error);
        }

    }

    public updateSession = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        const SessionData:CreateSessionDto = request.body;

        try {
           const result = await this.sessionService.updateSession(Number(id_textbook),Number(id_session),SessionData);
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteSession = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;

        try {
            const result = await this.sessionService.deleteSession(Number(id_textbook),Number(id_session)) ;
            response.status(200).send(`Session with id ${id_session} has been deleted`);
            
        } catch (error) {
            next(error);
        }
    }

}