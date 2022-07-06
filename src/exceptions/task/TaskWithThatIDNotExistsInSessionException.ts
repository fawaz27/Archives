import { HttpException } from "../HttpException";



class TaskWithThatIDNotExistsInSessionException extends HttpException
{

    constructor(id: number, session:string)
    {
        super(400, `Task with id ${id} not exists in session ${session} or there is no task with id ${id} `);
    }
}

export default TaskWithThatIDNotExistsInSessionException;
