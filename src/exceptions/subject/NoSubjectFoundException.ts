import { HttpException } from "../HttpException";



class NoSubjectFoundException extends HttpException
{

    constructor()
    {
        super(404, `No subject exist`);
    }
}

export default NoSubjectFoundException;