import { HttpException } from "../HttpException";



class ClassWithThatNameHaveAlreadyTextbookException extends HttpException
{

    constructor(name: string,year:string)
    {
        super(400, `The class ${name} of the academic year ${year} already has a textbook`);
    }
}

export default ClassWithThatNameHaveAlreadyTextbookException;
