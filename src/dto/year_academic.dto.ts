import {IsString,IsNotEmpty} from 'class-validator'

class CreateYearDto{


    @IsNotEmpty({message: ' please the year is required'})
    @IsString()
    year: string;

}

export default CreateYearDto;
