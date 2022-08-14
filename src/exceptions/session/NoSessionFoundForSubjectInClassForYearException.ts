import { HttpException } from "../HttpException";



class NoSessionFoundForSubjectInClassForYearException extends HttpException
{

    constructor(subject:string,classe:string,year:string)
    {
        super(404, `No session found for the subject ${subject} in the class ${classe} for year ${year}`);
    }
}

export default NoSessionFoundForSubjectInClassForYearException;