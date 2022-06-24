import { HttpException } from "../HttpException";



class NoClassFoundException extends HttpException
{

    constructor()
    {
        super(404, `No class exist`);
    }
}

export default NoClassFoundException;