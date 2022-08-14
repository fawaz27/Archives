import { HttpException } from "../HttpException";



class NoTexbookFoundForClassForYearException extends HttpException
{

    constructor(classe: string,year:string)
    {
        super(404, ` Textbook with class ${classe} and year ${year} not exists`);
    }
}

export default NoTexbookFoundForClassForYearException;
