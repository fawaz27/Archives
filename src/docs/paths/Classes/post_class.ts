const postclass ={
    "tags":["Classes"],
    "summary":"Create a new class",
    "parameters":[
        {
            "name":"class",
            "in":"body",
            "description": "Class that we want to create",
            "schema": {
              "$ref": "#/definitions/CreateClassDto"
            }
        }
    ],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{  
            "$ref": "#/definitions/Class"   
        }
        }
    }
}

export default postclass;