import { HttpException } from "../HttpException";



class TaskWithThatIDNotExistsInSessionException extends HttpException
{

    constructor(id: number, session:number)
    {
        super(404, `Task with id ${id} not exists in session with id ${session} or there is no task with id ${id} `);
    }
}

export default TaskWithThatIDNotExistsInSessionException;
