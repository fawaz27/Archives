import { HttpException } from "../HttpException";



class NoYearFoundException extends HttpException
{

    constructor()
    {
        super(404, `No class exist`);
    }
}

export default NoYearFoundException;