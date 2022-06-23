import { HttpException } from "../HttpException";



class NoUserFoundException extends HttpException
{

    constructor()
    {
        super(404, `No users exist`);
    }
}

export default NoUserFoundException;