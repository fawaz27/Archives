const register ={
    "tags":["Authentification"],
    "summary":"Create a new teacher",
    "parameters":[
        {
            "name":"teacher",
            "in":"body",
            "description": "Teacher that we want to create",
            "schema": {
              "$ref": "#/definitions/CreateTeacherDto"
            }
        }
    ],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{  
            "$ref": "#/definitions/Teacher"   
        }
        }
    }
}

export default register;