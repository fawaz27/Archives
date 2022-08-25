import { HttpException } from "../HttpException";



class YearIsStringException extends HttpException
{

    constructor()
    {
        super(400, `yearAcademic is required in query and must be a string`);
    }
}

export default YearIsStringException;