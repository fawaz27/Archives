import { HttpException } from "../HttpException";



class TextbookWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(400, `Textbook with id ${id} not exists`);
    }
}

export default TextbookWithThatIDNotExistsException;
