import { HttpException } from "../HttpException";



class NoSessionFoundInTextbookException extends HttpException
{

    constructor(textbook:string,classe:string)
    {
        super(404, `No session found in the textbook ${textbook} of the class ${classe}`);
    }
}

export default NoSessionFoundInTextbookException;