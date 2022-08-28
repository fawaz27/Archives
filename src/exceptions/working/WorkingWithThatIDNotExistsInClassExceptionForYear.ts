import { HttpException } from "../HttpException";



class WorkingWithThatIDNotExistsInClassForYearException extends HttpException
{

    constructor(id: number,classname:string,yearAcademic:string)
    {
        super(404, `There is no working time with id ${id}  in class ${classname} for yearAcademic ${yearAcademic} `);
    }
}

export default WorkingWithThatIDNotExistsInClassForYearException;
