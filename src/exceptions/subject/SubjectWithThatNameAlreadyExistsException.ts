import { HttpException } from "../HttpException";



class SubjectWithThatNameAlreadyExistsException extends HttpException
{

    constructor(name: string,classname:string)
    {
        super(400, `Subject with name ${name} in class ${classname} already exists`);
    }
}

export default SubjectWithThatNameAlreadyExistsException;
