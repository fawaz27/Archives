import { Request } from 'express';
import { Enseignant } from '../models/enseignant.entity';


interface RequestWithUser extends Request {
    user:Enseignant;
}
export default RequestWithUser;