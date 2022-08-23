const putSessionByTeacher ={
    "tags":["Teachers"],
    "summary":"Update Session with give ID by teacher" ,
    "parameters":[
        {
            "name":"session",
            "in":"body",
            "description":"Session with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateSessionDto"
            }

        }
    ],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{   
            "$ref": "#/definitions/Session"
  
        }
        }
    }
}

export default putSessionByTeacher;