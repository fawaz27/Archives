import express from 'express';
import{Request,Response,NextFunction} from 'express';
import RequestWithUser from "../interfaces/requestWithUser.interface";
import {TeacherService} from '../services/teacher.service'
import validationMiddleware from '../middlewares/validationMiddleware';
import CreateTeacherDto from '../dto/teacher.dto';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
import CreateSessionDto from '../dto/session.dto';
import RequestWithTeacher from '../interfaces/requestWithUser.interface';
import CreateYearDto from '../dto/year_academic.dto';
import CreateSessionYearDto from '../dto/sessionyear.dto';
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
            .all(`${this.path}/:id`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .all(`${this.path}/:id`,isAdminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id`,this.getTeacherById)
            .put(`${this.path}/:id`,validationMiddleware(CreateTeacherDto),this.updateTeacher)
            .delete(`${this.path}/:id`,this.dropTeacher)
            
            

        this.router
            // .all(`/mysubjects*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`/mysubjects`,this.getTeacherSubjects as unknown as (req:Request,res:Response,net:NextFunction)=>{} )
            .get(`/mysubjects/:id_subject/sessions`,this.getSessionSubjects as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .post(`/mysubjects/:id_subject/sessions`,validationMiddleware(CreateSessionYearDto),this.addSession as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .put(`/mysubjects/:id_subject/sessions/:id_session`,validationMiddleware(CreateSessionYearDto),this.updateSession as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .delete(`/mysubjects/:id_subject/sessions/:id_session`,this.deleteSession as unknown as (req:Request,res:Response,net:NextFunction)=>{})

            


        
        
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
            response.status(200).send(`Teachers with id ${id} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }

    public getTeacherSubjects = async (request: RequestWithTeacher, response: express.Response, next: express.NextFunction) => {
            

        const id = request.user.id;
        
        
        try {

            const result = await this.teacherService.getSubjectsTeacher(Number(id)) ;
            response.status(200).send(result)
            
        } catch (error) {
            next(error);
        }

    }

    public getSessionSubjects = async (request: RequestWithTeacher, response: express.Response, next: express.NextFunction) => {

        const id = request.user.id;
        const id_subject = request.params.id_subject;
        const yearData=request.query.yearAcademic;
        try {

            const result = await this.teacherService.getSessionsTeacher(Number(id),Number(id_subject),yearData) ;
            response.status(200).send(result)
            
        } catch (error) {
            next(error);
        }

    }

    public addSession = async (request: RequestWithTeacher, response: express.Response, next: express.NextFunction) => {
        const Session:CreateSessionYearDto =request.body;
        const id = request.user.id;
        const id_subject = request.params.id_subject;
        const year_academic=Session.yearAcademic;

        try {
            
            const created= await this.teacherService.addSession(Number(id),Number(id_subject),year_academic,Session);
            response.status(201).send(created);
        } catch (error) {

            next(error);            
        }
    }


    public updateSession = async(request: RequestWithTeacher, response: express.Response, next: express.NextFunction)=>{
    
        const Session:CreateSessionYearDto=request.body;
        const id = request.user.id;
        const id_session = request.params.id_session;
        const id_subject = request.params.id_subject;
        const year_academic=Session.yearAcademic;

        try {
           const result = await this.teacherService.updateSession(Number(id),Number(id_subject),year_academic,Number(id_session),Session);
           response.status(200).send(result);        
        } catch (error) {
            next(error);
        }
    }


    public deleteSession = async(request: RequestWithTeacher, response: express.Response, next: express.NextFunction)=>{

        const id_session = request.params.id_session;
        const id = request.user.id;
        const id_subject = request.params.id_subject;
        const year_academic=request.query.yearAcademic;
        try {
            const result = await this.teacherService.deleteSession(Number(id),Number(id_subject),year_academic,Number(id_session));
            response.status(200).send(`Sessions with id ${id_session} has been deleted`);
            
        } catch (error) {
            next(error);
        }
    }






}