import { HttpException } from "../HttpException";



class UserWithThatEmailNotExistsException extends HttpException
{

    constructor(email: string)
    {
        super(404, `User with email ${email} not exists`);
    }
}

export default UserWithThatEmailNotExistsException;
