import {IsString,IsNotEmpty,IsNumber} from 'class-validator'


class CreateSessionYearDto{


    @IsNotEmpty({message: ' please the date is required'})
    @IsString()
    public date: string;

    @IsNotEmpty({message: ' please the start time is required'})
    @IsString()
    public start_time: string;

    @IsNotEmpty({message: ' please the end   time is required'})
    @IsString()
    public end_time: string;

    @IsNumber()
    public duration: number;

    @IsNotEmpty({message: ' please the title is required'})
    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsString()
    public annex_document: string;

    @IsString()
    public point_of_presence: string;

    @IsNotEmpty({message: ' please the summary_course is required'})
    @IsString()
    public summary_course: string;

    @IsNotEmpty({message: ' please yearAcademic is required'})
    @IsString()
    public yearAcademic: string;

    

}

export default CreateSessionYearDto;