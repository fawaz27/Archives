import { HttpException } from "../HttpException";



class ClassWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(404, `Class with id ${id} not exists`);
    }
}

export default ClassWithThatIDNotExistsException;
