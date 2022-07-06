import {IsString,IsNotEmpty} from 'class-validator'

class CreateTextbookDto{

    @IsString()
    @IsNotEmpty({message: ' please the yearAcademic is required'})
    public yearAcademic: string;


}

export default CreateTextbookDto;