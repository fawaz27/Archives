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
            .get(this.path,this.getAllSubjets)
            .post(this.path,validationMiddleware(CreateSubjectDto),this.createSubject);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id_subject`,this.getSubjectById)
            .put(`${this.path}/:id_subject`,validationMiddleware(CreateSubjectDto),this.updateSubject)
            .delete(`${this.path}/:id_subject`,this.deleteSubject)


        
        
    }


    public getAllSubjets = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        const id_class = request.params.id_class;
        try {
            const result = await this.subjectService.getAllSubjects(Number(id_class));
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public createSubject = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id_class = request.params.id_class;
        const SubjectData:CreateSubjectDto =request.body;

        try {
            
            const created= await this.subjectService.createSubject(Number(id_class),SubjectData);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public getSubjectById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        try {
            const subject = await this.subjectService.getSubjectById(Number(id_class),Number(id_subject));
            response.status(200).send(subject);
        } catch (error) {
            next(error);
        }

    }

    public updateSubject = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        const SubjectData:CreateSubjectDto = request.body;

        try {
           const result = await this.subjectService.updateSubject(SubjectData,Number(id_class),Number(id_subject));
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteSubject = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_class = request.params.id_class;
        const id_subject = request.params.id_subject;
        try {
            const result = await this.subjectService.deleteSubject(Number(id_class),Number(id_subject)) ;
            response.status(200).send(`Subject with id ${id_subject} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }







}