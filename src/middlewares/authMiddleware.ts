import  jwt from 'jsonwebtoken';
import {NextFunction, Response } from 'express';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface'
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { AppDataSource } from '../database/AppDataSource'
import { Enseignant } from '../models/enseignant.entity';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction)
{
    console.log(request.cookies);
    const cookies =request.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_KEY;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret as string) as DataStoredInToken;
            const id = verificationResponse._id;

            const user = await  AppDataSource.getRepository(Enseignant).findOneBy({id: Number(id)});

            if (user) {
                request.user=user;
                next();
                
            }
            else
                next(new WrongAuthenticationTokenException());


            
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
        
    } else {
        next (new AuthenticationTokenMissingException());
    }
    
}


export default authMiddleware;