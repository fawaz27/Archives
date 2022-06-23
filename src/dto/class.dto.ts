import {IsString,IsNotEmpty, IsNumber} from 'class-validator'

class CreateClassDto{

    @IsNotEmpty({message: ' please the name is required'})
    @IsString()
    public name: string;

    @IsNotEmpty({message: ' please the year academic is required'})
    @IsString()
    public yearAcademic:string;

}

export default CreateClassDto;