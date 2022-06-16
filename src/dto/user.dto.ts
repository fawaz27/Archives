import {IsString,IsNotEmpty} from 'class-validator'

class CreateUserDto
{
    
    @IsString()
    public lastName: string;

    @IsString()
    public firstName: string;

    @IsNotEmpty({message: ' please the email is required'})
    @IsString()
    public email: string;

    @IsNotEmpty({message: ' please the password is required'})
    @IsString()
    public hashPassword: string;

    @IsString()
    public phone: string;

    @IsString()
    public role: string;

}

export default CreateUserDto;
