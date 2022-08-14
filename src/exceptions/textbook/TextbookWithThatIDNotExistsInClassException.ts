import { HttpException } from "../HttpException";



class TextbookWithThatIDNotExistsInClassException extends HttpException
{

    constructor(id: number,classe:string)
    {
        super(404, `Textbook with id ${id} not exists in classe ${classe} or  there is no textbook with id ${id}`);
    }
}

export default TextbookWithThatIDNotExistsInClassException;
