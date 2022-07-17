import express from 'express';
import{Request,Response,NextFunction} from 'express';
import {TeacherService} from '../services/teacher.service'
import validationMiddleware from '../middlewares/validationMiddleware';
import CreateTeacherDto from '../dto/teacher.dto';
import authMiddleware from '../middlewares/authMiddleware';
import isAdminMiddleware from '../middlewares/isAdminMiddleware';
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
            .get(`${this.path}/:id`,this.GetTeacherById)
            .put(`${this.path}/:id`,validationMiddleware(CreateTeacherDto),this.updateTeacher)
            .delete(`${this.path}/:id`,this.dropTeacher)


        
        
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

    public GetTeacherById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

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






}