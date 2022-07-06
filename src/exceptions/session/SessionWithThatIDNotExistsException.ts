import { HttpException } from "../HttpException";



class SessionWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(400, `Session with id ${id} not exists`);
    }
}

export default SessionWithThatIDNotExistsException;
