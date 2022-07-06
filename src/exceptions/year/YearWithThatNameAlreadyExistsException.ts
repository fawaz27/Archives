import { HttpException } from "../HttpException";



class YearWithThatNameAlreadyExistsException extends HttpException
{

    constructor(name: string)
    {
        super(400, `year with name ${name}  already exists`);
    }
}

export default YearWithThatNameAlreadyExistsException;
