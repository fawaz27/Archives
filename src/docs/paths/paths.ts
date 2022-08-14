
import deleteclass from "./Classes/delete_class";
import getclass from "./Classes/get_class";
import getclasses from "./Classes/get_classes";
import postclass from "./Classes/post_class";
import putclass from "./Classes/put_class";
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

    },
    "/auth/register":{

    },
    "/year_academic":{

    },
    "/year_academic/{id_year}":{
        
    },
    "/classes/{id_class}/subjects":{

    },
    "/classes/{id_class}/subjects/id_subject":{
        
    },
    "/classes/{id_class}/textbooks":{

    },
    "/classes/{id_class}/textbooks/{id_textbook}":{

    },
    "/classes/{id_class}/textbooks/{id_textbook}/subjects/{id_subject}/sessions":{

    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions":{

    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions/{id_session}":{

    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions/{id_session}/tasks":{

    },
    "/classes/{id_class}/textbooks/{id_textbook}/sessions/{id_session}/tasks/{id_task}":{
        
    },
    "/teachers":{

    },
    "/teachers/{id}":{
        
    },
    "/teachers/{id}/subjects":{
        
    },
    "/teachers/{id}/subjects/{id_subject}/sessions":{
        
    },
    "/teachers/{id}/subjects/{id_subject}/sessions/{id_session}":{
        
    }
};

export default paths;