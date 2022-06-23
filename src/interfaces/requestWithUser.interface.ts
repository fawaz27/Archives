import { Request } from 'express';
import { Enseignant } from '../models/teacher.entity


interface RequestWithUser extends Request {
    user:Enseignant;
}
export default RequestWithUser;