import { HttpException } from "../HttpException";



class TeacherWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(400, `Teacher with id ${id} not exists`);
    }
}

export default TeacherWithThatIDNotExistsException;
