import express from 'express';
import{Request,Response,NextFunction} from 'express';
import {TeacherService} from '../services/teacher.service'
import validationMiddleware from '../middlewares/validationMiddleware';
import CreateTeacherDto from '../dto/teacher.dto';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateSessionDto from '../dto/session.dto';
export class TeacherController{

    public path = '/teachers'
    public router =express.Router();
    public teacherService:TeacherService;

    constructor(){      
        this.teacherService = new TeacherService();
        this.initializeRoutes();
    }

    private initializeRoutes()
    {
        this.router
            .all(`${this.path}`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(this.path,this.getAllTeachers)
            .post(this.path,validationMiddleware(CreateTeacherDto),this.createTeacher);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id`,this.getTeacherById)
            .put(`${this.path}/:id`,validationMiddleware(CreateTeacherDto),this.updateTeacher)
            .delete(`${this.path}/:id`,this.dropTeacher)
            .get(`${this.path}/:id/subjects`,this.getTeacherSubjects)
            .get(`${this.path}/:id/subjects/:id_subject/sessions`,this.getSessionSubjects)
            .post(`${this.path}/:id/subjects/:id_subject/sessions`,validationMiddleware(CreateSessionDto),this.addSession)
            .put(`${this.path}/:id/subjects/:id_subject/sessions/:id_session`,validationMiddleware(CreateSessionDto),this.updateSession)
            .delete(`${this.path}/:id/subjects/:id_subject/sessions/:id_session`,validationMiddleware(CreateSessionDto),this.deleteSession)


        
        
    }

    public getAllTeachers = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        try {
            const result = await this.teacherService.getAllTeachers();
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
    public createTeacher = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const TeacherData:CreateTeacherDto =request.body;

        try {
            
            const created= await this.teacherService.createTeacher(TeacherData);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }

    public getTeacherById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;
        try {
            const user = await this.teacherService.GetTeacherById(Number(id));
            response.status(200).send(user);
        } catch (error) {
            next(error);
        }

    }

    public GetTeacherByEmail = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const email = request.params.email;
        try {
            const user = await this.teacherService.getTeacherByEmail(email);
            response.status(200).send(user);
        } catch (error) {
            next(error);
        }

    }

    public updateTeacher = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id = request.params.id;
        const TeacherData:CreateTeacherDto = request.body;

        try {
           const result = await this.teacherService.UpdateUser(TeacherData,Number(id));
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }

    public dropTeacher = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id = request.params.id;
        try {
            const result = await this.teacherService.dropTeacher(Number(id)) ;
            response.status(200).send(`Users with id ${id} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }

    public getTeacherSubjects = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;
        const year_academic_=request.body.year_academic;
        try {

            const result = await this.teacherService.getSubjectsTeacher(Number(id)) ;
            response.status(200).send(result)
            
        } catch (error) {
            next(error);
        }

    }

    public getSessionSubjects = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;
        const id_subject = request.params.id_subject;
        const year_academic=request.body.year_academic;
        try {

            const result = await this.teacherService.getSessionsTeacher(Number(id),Number(id_subject),year_academic) ;
            response.status(200).send(result)
            
        } catch (error) {
            next(error);
        }

    }

    public addSession = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const Session:CreateSessionDto =request.body;
        const id = request.params.id;
        const id_subject = request.params.id_subject;
        const year_academic=request.body.year_academic;

        try {
            
            const created= await this.teacherService.addSession(Number(id),Number(id_subject),year_academic,Session);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public updateSession = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const Session:CreateSessionDto =request.body;
        const id = request.params.id;
        const id_session = request.params.id_session;
        const id_subject = request.params.id_subject;
        const year_academic=request.body.year_academic;

        try {
           const result = await this.teacherService.updateSession(Number(id),Number(id_subject),year_academic,Number(id_session),Session);
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteSession = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_session = request.params.id_session;
        const id = request.params.id;
        const id_subject = request.params.id_subject;
        const year_academic=request.body.year_academic;
        try {
            const result = await this.teacherService.deleteSession(Number(id),Number(id_subject),year_academic,Number(id_session));
            response.status(200).send(`Sessions with id ${id_session} has been deleted`);
            
        } catch (error) {
            next(error);
        }
    }






}