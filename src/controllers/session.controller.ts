import express from 'express';
import{Request,Response,NextFunction} from 'express';
import { SessionService } from '../services/session.service';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateSessionDto from '../dto/session.dto';


export class SessionController{

    public path = '/classes/:id_class/textbooks/:id_textbook'
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
            .get(`${this.path}/subjects/:id_subject/sessions`,this.GetAllSessionsSubject)
            .get(`${this.path}/sessions`,this.GetAllSessions)
            .post(`${this.path}/subjects/:id_subject/sessions`,validationMiddleware(CreateSessionDto),this.CreateSession);

        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/sessions/:id_session`,this.GetSessionById)
            .put(`${this.path}/sessions/:id_session`,validationMiddleware(CreateSessionDto),this.UpdateSession)
            .delete(`${this.path}/sessions/:id_session`,this.DeleteSession);     
        
    }



    public GetAllSessionsSubject = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        const id_textbook = request.params.id_textbook;
        try {
            const result = await this.sessionService.GetAllSessionsSubject(Number(id_class),Number(id_textbook),Number(id_subject));
            response.send(result);
        } catch (error) {
            next(error);
        }
    }


    public GetAllSessions = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        try {
            const result = await this.sessionService.GetAllSessions(Number(id_class),Number(id_textbook));
            response.send(result);
        } catch (error) {
            next(error);
        }
    }


    public CreateSession = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        const id_textbook = request.params.id_textbook;
        const SessionData:CreateSessionDto =request.body;

        try {
            
            const created= await this.sessionService.CreateSession(Number(id_class),Number(id_textbook),Number(id_subject),SessionData);
            response.send(created);
        } catch (error) {

            next(error);            
        }
    }


    public GetSessionById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        try {
            const session = await this.sessionService.GetSessionById(Number(id_class),Number(id_textbook),Number(id_session));
            response.send(session);
        } catch (error) {
            next(error);
        }

    }

    public UpdateSession = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;
        const SessionData:CreateSessionDto = request.body;

        try {
           const result = await this.sessionService.UpdateSession(Number(id_class),Number(id_textbook),Number(id_session),SessionData);
           response.send(result);        
        } catch (error) {
            next(error);
        }
    }


    public DeleteSession = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_class = request.params.id_class;
        const id_textbook = request.params.id_textbook;
        const id_session = request.params.id_session;

        try {
            const result = await this.sessionService.DeleteSession(Number(id_class),Number(id_textbook),Number(id_session)) ;
            response.send(`Session with id ${id_session} has been deleted`);
            
        } catch (error) {
            next(error);
        }
    }

}