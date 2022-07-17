import  jwt from 'jsonwebtoken';
import {NextFunction, Response ,Request} from 'express';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface'
import RequestWithTeacher from '../interfaces/requestWithUser.interface';
import { AppDataSource } from '../database/AppDataSource'
import { Teacher } from '../models/teacher.entity'
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';

async function authMiddleware(request: RequestWithTeacher, response: Response, next: NextFunction)
{
   //console.log(request);
   //request.cookies={};
    const cookies =request.cookies;
    //console.log(cookies);
    
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_KEY;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret as string) as DataStoredInToken;
            const id = verificationResponse._id;

            const user = await  AppDataSource.getRepository(Teacher).findOneBy({id: Number(id)});

            if (user) {
                request.user=user;
                next();
                
            }
            else
                next(new WrongAuthenticationTokenException());


            
        } catch (error) {
            console.log('test');
            
            next(new WrongAuthenticationTokenException());
        }
        
    } else {
        next (new AuthenticationTokenMissingException());
    }
    
}


export default authMiddleware;