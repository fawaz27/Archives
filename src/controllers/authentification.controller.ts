import express from 'express';
import { AuthentificationService } from '../services/authentification.service';
import CreateTeacherDto from '../dto/teacher.dto';
import validationMiddleware from '../middlewares/validationMiddleware';
import logInDto from '../dto/login.dto';


export class AuthentificationController{

    public path = '/auth'
    public router =express.Router();
    public authService:AuthentificationService;
    
    constructor(){      
      this.authService = new AuthentificationService();
      this.initializeRoutes();
    }

    
    
    private initializeRoutes()
    {
        this.router.post(`${this.path}/register`,validationMiddleware(CreateTeacherDto), this.registration);
        this.router.post(`${this.path}/login`,validationMiddleware(logInDto), this.logIn);
        this.router.post(`${this.path}/logout`, this.logOut)
        
    }

    public  registration = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const TeacherData:CreateTeacherDto =request.body;
        //console.log(TeacherData);
        try {
            const created= await this.authService.register(TeacherData);
            response.status(201).send(created);
   
        } catch (error) {
           
            next(error);
        }
    }

    public  logIn = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        
        const login:logInDto=request.body;
        
        try {
            const {cookie,result} = await this.authService.logIn(login);
            response.setHeader('Set-Cookie', [cookie]);//?
            response.status(200).send(result);


        } catch (error) {
            next(error);
        }
        
    }

    public  logOut = async(request: express.Request, response: express.Response)=>{
        
        try {
            const result = await this.authService.logOut()
            response.setHeader('Set-Cookie', [result]);
            response.status(200).send();
        } catch (error) {
            console.log(error);
            
            
        }
        
        
    }

    




}

