
import login from "./Auth/login";
import register from "./Auth/register";
import deleteclass from "./Classes/delete_class";
import getclass from "./Classes/get_class";
import getclasses from "./Classes/get_classes";
import postclass from "./Classes/post_class";
import putclass from "./Classes/put_class";
import deleteSession from "./Sessions/delete_session";
import getSession from "./Sessions/get_session";
import getSessions from "./Sessions/get_sessions";
import getSessionsSubject from "./Sessions/get_sessions_subject";
import postSession from "./Sessions/post_session";
import putSession from "./Sessions/put_session";
import deleteSubject from "./Subjects/delete_subject";
import getSubject from "./Subjects/get_subject";
import getSubjects from "./Subjects/get_subjects";
import postSubject from "./Subjects/post_subject";
import putSubjects from "./Subjects/put_subject";
import deleteTask from "./Tasks/delete_task";
import getTask from "./Tasks/get_task";
import getTasks from "./Tasks/get_tasks";
import postTask from "./Tasks/post_task";
import putTask from "./Tasks/put_task";
import deleteSessionByTeacher from "./Teacher/delete_sessionbyTeacher";
import deleteTeacher from "./Teacher/delete_teacher";
import getTeacher from "./Teacher/get_teacher";
import getTeachers from "./Teacher/get_teachers";
import getTeacherSessions from "./Teacher/get_teacher_sessions";
import getTeacherSubjects from "./Teacher/get_teacher_subjects";
import postSessionByTeacher from "./Teacher/post_sessionbyTeacher";
import postTeacher from "./Teacher/post_teacher";
import putSessionByTeacher from "./Teacher/put_sessionbyTeacher";
import putTeacher from "./Teacher/put_teacher";
import deleteTextbook from "./Textbooks/delete_textbook";
import getTextbook from "./Textbooks/get_textbook";
import getTextbooks from "./Textbooks/get_textbooks";
import postTextbook from "./Textbooks/post_textbook";
import putTextbook from "./Textbooks/put_textbook";
import deleteYear from "./Year/delete_year";
import getYear from "./Year/get_year";
import getYears from "./Year/get_years";
import postYear from "./Year/post_year";
import putYear from "./Year/put_year";
const paths = {
    "/classes":{
        "get":getclasses,
        "post":postclass,
    },
    "/classes/{id}":{
        "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of class that we want to find",
              "type": "integer"
            }
        ],
        "get":getclass,
        "put":putclass,
        "delete":deleteclass,
    },
    "/auth/login":{
        "post":login

    },
    "/auth/register":{
        "post":register

    },
    "/year_academic":{
        "get":getYears,
        "post":postYear

    },
    "/year_academic/{id_year}":{
        "parameters": [
            {
              "name": "id_year",
              "in": "path",
              "required": true,
              "description": "ID of year",
              "type": "integer"
            }
        ],
        "get":getYear,
        "put":putYear,
        "delete":deleteYear
        
    },
    "/classes/{id_class}/subjects":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class that we want to find subject",
              "type": "integer"
            }
        ],
        "get":getSubjects,
        "post":postSubject

    },
    "/classes/{id_class}/subjects/{id_subject}":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class that we want to find subject",
              "type": "integer"
            },
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject that we want to find subject",
                "type": "integer"
            }
        ],
        "get":getSubject,
        "put":putSubjects,
        "delete":deleteSubject
        
    },
    "/classes/{id_class}/textbooks":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class that we want to find textbook",
              "type": "integer"
            }
        ],
        "get":getTextbooks,
        "post":postTextbook

    },
    "/classes/{id_class}/textbooks/{id_textbook}":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class that we want to find textbook",
              "type": "integer"
            },
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook that we want to find textbook",
                "type": "integer"
            }
        ],
        "get":getTextbook,
        "put":putTextbook,
        "delete":deleteTextbook

    },
    "/classes/{id_class}/textbooks/{id_textbook}/subjects/{id_subject}/sessions":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class ",
              "type": "integer"
            },
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            },
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject ",
                "type": "integer"
            }
        ],
        "get":getSessionsSubject,
        "post":postSession
        

    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class ",
              "type": "integer"
            },
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            }
        ],
        "get":getSessions

    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions/{id_session}":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class ",
              "type": "integer"
            },
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            },
            {
                "name": "id_session",
                "in": "path",
                "required": true,
                "description": "ID of session ",
                "type": "integer"
            }
        ],
        "get":getSession,
        "put":putSession,
        "delete":deleteSession
    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions/{id_session}/tasks":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class ",
              "type": "integer"
            },
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            },
            {
                "name": "id_session",
                "in": "path",
                "required": true,
                "description": "ID of session ",
                "type": "integer"
            }
        ],
        "get":getTasks,
        "post":postTask

    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions/{id_session}/tasks/{id_task}":{
        "parameters": [
            {
              "name": "id_class",
              "in": "path",
              "required": true,
              "description": "ID of class ",
              "type": "integer"
            },
            {
                "name": "id_textbook",
                "in": "path",
                "required": true,
                "description": "ID of textbook ",
                "type": "integer"
            },
            {
                "name": "id_session",
                "in": "path",
                "required": true,
                "description": "ID of session ",
                "type": "integer"
            },
            {
                "name": "id_task",
                "in": "path",
                "required": true,
                "description": "ID of task ",
                "type": "integer"
            }
        ],
        "get":getTask,
        "put":putTask,
        "delete":deleteTask
        
    },
    "/teachers":{
        "get":getTeachers,
        "post":postTeacher

    },
    "/teachers/{id}":{
        "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of teacher that we want ",
              "type": "integer"
            }
        ],
        "get":getTeacher,
        "put":putTeacher,
        "delete":deleteTeacher
        
    },
    "/teachers/{id}/subjects":{
        "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of teacher that we want to find subjects",
              "type": "integer"
            }
        ],
        "get":getTeacherSubjects
        
    },
    "/teachers/{id}/subjects/{id_subject}/sessions":{
        "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of teacher that we want to find sessions",
              "type": "integer"
            },
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject that we want  to find sessions ",
                "type": "integer"
            }
        ],
        "get":getTeacherSessions,
        "post":postSessionByTeacher
        
        
    },
    "/teachers/{id}/subjects/{id_subject}/sessions/{id_session}":{

        "parameters": [
            {
              "name": "id",
              "in": "path",
              "required": true,
              "description": "ID of teacher ",
              "type": "integer"
            },
            {
                "name": "id_subject",
                "in": "path",
                "required": true,
                "description": "ID of subject  ",
                "type": "integer"
            },
            {
                "name": "id_session ",
                "in": "path",
                "required": true,
                "description": "ID of session that we want ",
                "type": "integer"

            }
        ],
        "put":putSessionByTeacher,
        "delete":deleteSessionByTeacher

        
        
    }
};

export default paths;