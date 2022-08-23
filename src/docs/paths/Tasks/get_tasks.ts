
const getTasks ={
    "tags":["Tasks"],
    "summary":"Get all tasks",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"array",
            "items":{
            "$ref": "#/definitions/Task"
            }
        
        }
        }
    }

}

export default getTasks;