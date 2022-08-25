import logindefinitions from "./Auth/Login.definitions";
import classdefinitions from "./Classes/Class.definitions";
import createClassDtodefinitions from "./Classes/CreateClassDto.definitions";
import createSessionDtodefinitions from "./Session/CreateSessionDto.definitions";
import createSessionYearDtodefinitions from "./Session/CreateSessionYearDto.definitions";
import sessiondefinitions from "./Session/session.definition";
import createSubjectDtodefinitions from "./Subject/CreateSubjectDto.definitions";
import subjectdefinitions from "./Subject/subject.definitions";
import createTaskDtodefinitions from "./Task/CreateTaskDto.definitions";
import taskdefinitions from "./Task/task.definitions";
import createTeacherDtodefinitions from "./Teacher/CreateTeacherDto.definitions";
import teacherdefinitions from "./Teacher/teacher.defintions";
import createTextbookDtodefinitions from "./Textbook/CreateTextbookDto.definitions";
import textbookdefinitions from "./Textbook/textbook.definitions";
import createYearDtodefinitions from "./Year_Academic/CreateYearDto.definitions";
import yeardefinitions from "./Year_Academic/year.defintions";

const definitions ={
    "Class":classdefinitions,
    "CreateClassDto":createClassDtodefinitions,
    "Session":sessiondefinitions,
    "CreateSessionDto":createSessionDtodefinitions,
    "CreateSessionYearDto":createSessionYearDtodefinitions,
    "Task":taskdefinitions,
    "CreateTaskDto":createTaskDtodefinitions,
    "Year_Academic":yeardefinitions,
    "CreateYearAcademicDto":createYearDtodefinitions,
    "Subject":subjectdefinitions,
    "CreateSubjectDto":createSubjectDtodefinitions,
    "Teacher":teacherdefinitions,
    "CreateTeacherDto":createTeacherDtodefinitions,
    "Textbook":textbookdefinitions,
    "CreateTextbookDto":createTextbookDtodefinitions,
    "LoginDto":logindefinitions
};

export default definitions;