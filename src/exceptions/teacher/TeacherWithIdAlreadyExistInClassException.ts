
import { HttpException } from "../HttpException";



class TeacherWithIdAlreadyExistInClassException extends HttpException
{

    constructor(id: number,classname:string)
    {
        super(400, `Teacher with id ${id} in class ${classname} already exists`);
    }
}

export default TeacherWithIdAlreadyExistInClassException;