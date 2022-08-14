import { HttpException } from "../HttpException";



class UserWithThatIDNotExistsException extends HttpException
{

    constructor(id: number)
    {
        super(404, `User with id ${id} not exists`);
    }
}

export default UserWithThatIDNotExistsException;
