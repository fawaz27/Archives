import { IsString,IsNotEmpty } from 'class-validator';

class logInDto
{
    @IsNotEmpty({message: ' please the email is required'})
    @IsString()
    public email: string;


    @IsNotEmpty({message: ' please the email is required'})
    @IsString()
    public password: string;
}


export default logInDto;