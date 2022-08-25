const putSessionByTeacher ={
    "tags":["Teachers"],
    "summary":"Update Session with give ID by teacher connected" ,
    "parameters":[
        {
            "name":"SessionYear",
            "in":"body",
            "description":"Session with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateSessionYearDto"
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