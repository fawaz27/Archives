import { HttpException } from "../HttpException";



class FormatYearException extends HttpException
{

    constructor()
    {
        super(400, `Year must be in format [0-*]-[0-*]+1`);
    }
}

export default FormatYearException;