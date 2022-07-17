import { Request } from 'express';
import { Teacher } from '../models/teacher.entity'


interface RequestWithTeacher extends Request {
    user:Teacher;
}
export default RequestWithTeacher;