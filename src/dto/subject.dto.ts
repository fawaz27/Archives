import { IsString,IsNotEmpty,IsNumber, ValidateIf} from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
class CreateSubjectDto{

    @IsNotEmpty({message: ' please the name is required'})
    @IsString()
    public name: string;

    @IsNumber()
    @ValidateIf((object,value)=>value!==null)
    public id_teacher:number|null;

}

export default CreateSubjectDto;