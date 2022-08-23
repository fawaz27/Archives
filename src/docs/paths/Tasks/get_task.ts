

const getTask ={
    "tags":["Tasks"],
    "summary":"Get Task with give ID",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "$ref": "#/definitions/Task"
        }
        }
    }
}

export default getTask;