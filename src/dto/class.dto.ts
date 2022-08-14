import {IsString,IsNotEmpty, IsNumber} from 'class-validator'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

class CreateClassDto{

    @IsNotEmpty({message: ' please the name is required'})
    @IsString()
    public name: string;

}

export default CreateClassDto;