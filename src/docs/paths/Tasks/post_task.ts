const postTask ={
    "tags":["Tasks"],
    "summary":"Create a new Task",
    "parameters":[
        {
            "name":"Task",
            "in":"body",
            "description": "Task that we want to create",
            "schema": {
              "$ref": "#/definitions/CreateTaskDto"
            }
        }
    ],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{  
            "$ref": "#/definitions/Task"   
        }
        }
    }
}

export default postTask;