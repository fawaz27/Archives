import { HttpException } from "../HttpException";



class NoTaskFoundInSessionException extends HttpException
{

    constructor(session:number)
    {
        super(404, `No tasks found in session with id ${session}`);
    }
}

export default NoTaskFoundInSessionException;