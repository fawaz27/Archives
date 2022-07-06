import { IsString,IsNotEmpty,IsDate} from 'class-validator';

class CreateTaskDto{

    @IsNotEmpty({message: ' please the name is required'})
    @IsString()
    public name: string;

    @IsString()
    public title: string;

    @IsNotEmpty({message: ' please the date_diven is required'})
    @IsString()
    public date_given: string;
    

    @IsString()
    public date_submission: string;

    @IsString()
    public statement: string;

    @IsString()
    public document_annex: string;

    @IsString()
    public type: string;

    @IsString()
    public createdAt: string;

}

export default CreateTaskDto;