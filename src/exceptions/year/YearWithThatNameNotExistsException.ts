import { HttpException } from "../HttpException";



class YearWithThatNameNotExistsException extends HttpException
{

    constructor(name: string)
    {
        super(400, `Year with name ${name} not exists`);
    }
}

export default YearWithThatNameNotExistsException;
