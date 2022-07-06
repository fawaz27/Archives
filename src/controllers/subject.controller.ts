import express from 'express';
import{Request,Response,NextFunction} from 'express';
import { SubjectService } from '../services/subject.service';
import validationMiddleware from '../middlewares/validationMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateSubjectDto from '../dto/subject.dto';


export class SubjectController{

    public path = '/classes/:id_class/subjects'
    public router =express.Router();
    public subjectService:SubjectService;
    

    constructor(){      
        this.subjectService = new SubjectService();
        this.initializeRoutes();
    }

    private initializeRoutes()
    {
        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.GetAllSubjets)
            .post(this.path,validationMiddleware(CreateSubjectDto),this.CreateSubject);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id_subject`,this.GetSubjectById)
            .put(`${this.path}/:id_subject`,validationMiddleware(CreateSubjectDto),this.UpdateSubject)
            .delete(`${this.path}/:id_subject`,this.DeleteSubject)


        
        
    }


    public GetAllSubjets = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        try {
            const result = await this.subjectService.GetAllSubjects(Number(id_class));
            response.send(result);
        } catch (error) {
            next(error);
        }
    }


    public CreateSubject = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id_class = request.params.id_class;
        const SubjectData:CreateSubjectDto =request.body;

        try {
            
            const created= await this.subjectService.CreateSubject(Number(id_class),SubjectData);
            response.send(created);
        } catch (error) {

            next(error);            
        }
    }


    public GetSubjectById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        try {
            const subject = await this.subjectService.GetSubjectById(Number(id_class),Number(id_subject));
            response.send(subject);
        } catch (error) {
            next(error);
        }

    }

    public UpdateSubject = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        const SubjectData:CreateSubjectDto = request.body;

        try {
           const result = await this.subjectService.UpdateSubject(SubjectData,Number(id_class),Number(id_subject));
           response.send(result);        
        } catch (error) {
            next(error);
        }
    }


    public DeleteSubject = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        try {
            const result = await this.subjectService.DeleteSubject(Number(id_class),Number(id_subject)) ;
            response.send(`Subject with id ${id_subject} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }







}