import { HttpException } from "../HttpException";



class SubjectWithThatIDNotExistsInClassException extends HttpException
{

    constructor(id: number, classe:string )
    {
        super(404, `Subject with id ${id} not exists in class ${classe} or there is no subject with id ${id}`);
    }
}

export default SubjectWithThatIDNotExistsInClassException;
