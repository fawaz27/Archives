import { Response,NextFunction } from "express";
import IsNotAdmin from "../exceptions/NotAdmin";
import RequestWithUser from "../interfaces/requestWithUser.interface";

async function isAdmin(request: RequestWithUser, response: Response, next: NextFunction){
    if (request.user.role==="admin") {
        next();
    }
    else{
        next (new IsNotAdmin(String(request.user.id)));
    }

}