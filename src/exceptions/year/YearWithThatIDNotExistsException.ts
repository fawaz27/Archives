import { HttpException } from "../HttpException";



class YearWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(404, `Year with id ${id} not exists`);
    }
}

export default YearWithThatIDNotExistsException;
