import { HttpException } from "../HttpException";



class NoWorkingForClassFoundException extends HttpException
{

    constructor(classe:string)
    {
        super(404, `No working time found for the class ${classe}`);
    }
}

export default NoWorkingForClassFoundException