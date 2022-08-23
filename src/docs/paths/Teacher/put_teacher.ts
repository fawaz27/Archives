const putTeacher ={
    "tags":["Teachers"],
    "summary":"Update Teacher with give ID" ,
    "parameters":[
        {
            "name":"Teacher",
            "in":"body",
            "description":"Teacher with new values of properties",
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

export default putTeacher;