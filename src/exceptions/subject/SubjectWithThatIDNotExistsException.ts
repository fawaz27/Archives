import { HttpException } from "../HttpException";



class SubjectWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(400, `Subject with id ${id} not exists`);
    }
}

export default SubjectWithThatIDNotExistsException;
