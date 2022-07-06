import { HttpException } from "../HttpException";



class ClassWithThatNameAndYearAlreadyExistsException extends HttpException
{

    constructor(name: string)
    {
        super(400, `Class with name ${name}  already exists`);
    }
}

export default ClassWithThatNameAndYearAlreadyExistsException;
