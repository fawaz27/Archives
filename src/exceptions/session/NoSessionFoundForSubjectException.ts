import { HttpException } from "../HttpException";



class NoSessionFoundForSubjectException extends HttpException
{

    constructor(subject:string,classe:string)
    {
        super(404, `No session found for the subject ${subject} in the class ${classe}`);
    }
}

export default NoSessionFoundForSubjectException;