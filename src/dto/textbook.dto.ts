import {IsString} from 'class-validator'

class CreateCahierDto{

    @IsString()
    public title: string;

}

export default CreateCahierDto;