import {IsString,IsNotEmpty} from 'class-validator'
import validate_year_academic from '../utils/validator-year_academic';

class CreateYearDto{


    @IsNotEmpty({message: ' please the year is required'})
    @IsString()
    year: string;

}

export default CreateYearDto;
