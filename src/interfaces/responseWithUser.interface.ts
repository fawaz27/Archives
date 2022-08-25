import { Response } from 'express';
import { Teacher } from '../models/teacher.entity'


interface ResponseWithTeacher extends Response {
    user:Teacher;
}
export default ResponseWithTeacher;