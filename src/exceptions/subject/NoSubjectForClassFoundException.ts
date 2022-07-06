import { HttpException } from "../HttpException";



class NoSubjectForClassFoundException extends HttpException
{

    constructor(classe:string)
    {
        super(404, `No subject found for the class ${classe}`);
    }
}

export default NoSubjectForClassFoundException