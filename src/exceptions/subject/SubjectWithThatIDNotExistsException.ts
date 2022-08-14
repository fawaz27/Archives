import { HttpException } from "../HttpException";



class SubjectWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(404, `Subject with id ${id} not exists`);
    }
}

export default SubjectWithThatIDNotExistsException;
