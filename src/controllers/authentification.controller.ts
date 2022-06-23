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
            const {cookie,created}= await this.authService.Register(TeacherData);
            response.setHeader('Set-Cookie', [cookie]);
            response.send(created);

            
        } catch (error) {
           
            next(error);
        }
    }

    public  logIn = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        const email:string= request.body.email;
        const password:string=request.body.password; 
        try {
            const {cookie,result} = await this.authService.LogIn(email,password);
            response.setHeader('Set-Cookie', [cookie]);
            response.send(result);


        } catch (error) {
            next(error);
        }
        
    }

    public  logOut = async(request: express.Request, response: express.Response)=>{
        
        try {
            response.setHeader('Set-Cookie', [await this.authService.LogOut()]);
            response.send(200);
        } catch (error) {
            console.log(error);
            
            
        }
        
        
    }

    




}

