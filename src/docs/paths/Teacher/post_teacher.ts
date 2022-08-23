const postTeacher ={
    "tags":["Teachers"],
    "summary":"Create a new Teacher",
    "parameters":[
        {
            "name":"Teacher",
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

export default postTeacher;