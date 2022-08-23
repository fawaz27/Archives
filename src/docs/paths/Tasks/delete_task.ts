const deleteTask ={
    "tags":["Tasks"],
    "summary":"Delete task with given ID ",
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"string",      
        }
        }
    }
}

export default deleteTask;