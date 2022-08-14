import { HttpException } from "../HttpException";



class SessionWithThatIDNotExistsInTextbookException extends HttpException
{

    constructor(id: number,textbook:string)
    {
        super(404, `Session with id ${id} not exists in textbook ${textbook} or there is no session with id ${id} `);
    }
}

export default SessionWithThatIDNotExistsInTextbookException;
