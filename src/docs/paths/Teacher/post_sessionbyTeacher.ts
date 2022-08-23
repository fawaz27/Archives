const postSessionByTeacher ={
    "tags":["Teachers"],
    "summary":"Create a new Session by teacher with given ID",
    "parameters":[
        {
            "name":"Session",
            "in":"body",
            "description": "Session that we want to create",
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

export default postSessionByTeacher;