import { HttpException } from "../HttpException";



class WorkingWithThatIDNotExistsInClassException extends HttpException
{

    constructor(id: number, classe:string )
    {
        super(404, `Working with id ${id} not exists in class ${classe} or there is no Working time with id ${id}`);
    }
}

export default WorkingWithThatIDNotExistsInClassException;
