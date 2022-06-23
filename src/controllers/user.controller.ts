
import express from 'express';
import {  getRepository } from 'typeorm';
import {User} from '../models/user.entity';
import authMiddleware from '../middlewares/authMiddleware';
import CreateEnseignantDto from '../dto/teacher.dto';
import CreateUserDto from '../dto/user.dto';
import validationMiddleware from '../middlewares/validationMiddleware';

export class UserController{
    public path = '/users'
    public router =express.Router();
    private usersRepository = getRepository(User);

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path, authMiddleware, this.getAllUsers);
        this.router.get(`${this.path}/:id`,authMiddleware, this.getUsersById);
        this.router
            .all(`${this.path}/*`)
            .patch(`${this.path}/:id`, validationMiddleware(CreateUserDto, true), this.modifyUsers)
            .delete(`${this.path}/:id`,authMiddleware, this.deleteUser);
    }

    public getAllUsers = async (request: express.Request, response: express.Response) => {
        
    }

    public getUsersById = async (request: express.Request, response: express.Response, next : express.NextFunction) => {
        
       
    }
    public modifyUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        

    }

    public deleteUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        
        
    }

}



