import {IsString,IsNotEmpty, IsObject} from 'class-validator'
import Working from '../interfaces/working.Interface';

class CreateWorkingDto
{

    @IsNotEmpty({message: ' please the working is required'})
    @IsObject()
    public working: Working;

    @IsNotEmpty({message: ' please the yearAcademic is required'})
    @IsString()
    public yearAcademic: string;

    

}

export default CreateWorkingDto;