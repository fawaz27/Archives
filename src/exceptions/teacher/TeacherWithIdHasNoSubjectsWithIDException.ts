import { HttpException } from "../HttpException";



class TeacherWithIdHasNoSubjectsWithIDException extends HttpException
{

    constructor(id: number,id_subject:number)
    {
        super(404, `Teacher with id ${id} has no subjects with id ${id_subject} `);
    }
}

export default TeacherWithIdHasNoSubjectsWithIDException;