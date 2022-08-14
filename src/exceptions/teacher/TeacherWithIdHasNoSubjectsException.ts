import { HttpException } from "../HttpException";



class TeacherWithIdHasNoSubjectsException extends HttpException
{

    constructor(id: number)
    {
        super(404, `Teacher with id ${id} has no subjects`);
    }
}

export default TeacherWithIdHasNoSubjectsException;