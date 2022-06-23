import {IsString,IsNotEmpty,IsDate} from 'class-validator'

class CreateSessionDto{


    @IsNotEmpty({message: ' please the date is required'})
    @IsDate()
    public date: Date;

    @IsNotEmpty({message: ' please the title is required'})
    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsString()
    public annex_document: string;

    @IsNotEmpty({message: ' please the summary_course is required'})
    @IsString()
    public summary_course: string;

    @IsString()
    public duration: string;

}

export default CreateSessionDto;