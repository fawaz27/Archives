import { HttpException } from "../HttpException";



class ClassWithThatNameAndYearAlreadyExistsException extends HttpException
{

    constructor(name: string,year:string)
    {
        super(400, `Class with name ${name} and the academic year ${year} already exists`);
    }
}

export default ClassWithThatNameAndYearAlreadyExistsException;
