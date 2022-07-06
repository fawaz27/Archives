import { Request } from 'express';
import { Teacher } from '../models/teacher.entity'


interface RequestWithUser extends Request {
    user:Teacher;
}
export default RequestWithUser;