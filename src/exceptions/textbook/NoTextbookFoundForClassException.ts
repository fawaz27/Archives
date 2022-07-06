import { HttpException } from "../HttpException";



class NoTextbookFoundForClassException extends HttpException
{
    constructor(classe:string)
    {
        super(404, `No Textbook found for the class ${classe}`);
    }
}

export default NoTextbookFoundForClassException;