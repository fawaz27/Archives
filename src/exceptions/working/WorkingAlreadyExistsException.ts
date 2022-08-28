import { HttpException } from "../HttpException";



class WorkingAlreadyExistsException extends HttpException
{

    constructor(classname:string,year: string)
    {
        super(400, `Working time  for class  ${classname} already exists in yearAcademic  ${year} `);
    }
}

export default WorkingAlreadyExistsException;
