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
            .get(this.path,this.GetAllTeachers)
            .post(this.path,validationMiddleware(CreateTeacherDto),this.CreateTeacher);

        this.router
            .all(`${this.path}/*`,authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{})
            .get(`${this.path}/:id`,this.GetTeacherById)
            .patch(`${this.path}/:id`,validationMiddleware(CreateTeacherDto,true),this.UpdateTeacher)
            .delete(`${this.path}/:id`,this.DropTeacher)


        
        
    }

    public GetAllTeachers = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
      
        try {
            const result = await this.teacherService.GetAllUsers();
            response.send(result);
        } catch (error) {
            next(error);
        }
    }
    public CreateTeacher = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const TeacherData:CreateTeacherDto =request.body;

        try {
            
            const created= await this.teacherService.CreateUser(TeacherData);
            response.send(created);
        } catch (error) {

            next(error);            
        }
    }

    public GetTeacherById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const id = request.params.id;
        try {
            const user = await this.teacherService.GetUserById(Number(id));
            response.send(user);
        } catch (error) {
            next(error);
        }

    }

    public GetTeacherByEmail = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const email = request.params.email;
        try {
            const user = await this.teacherService.GetUserByEmail(email);
            response.send(user);
        } catch (error) {
            next(error);
        }

    }

    public UpdateTeacher = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    
        const id = request.params.id;
        const TeacherData:CreateTeacherDto = request.body;

        try {
           const result = await this.teacherService.UpdateUser(TeacherData,Number(id));
           response.send(result);        
        } catch (error) {
            next(error);
        }
    }

    public DropTeacher = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id = request.params.id;
        try {
            const result = await this.teacherService.DropUser(Number(id)) ;
            response.send(`Users with id ${id} has been deleted`)
            
        } catch (error) {
            next(error);
        }
    }






}