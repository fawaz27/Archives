
const getSessions ={
    "tags":["Sessions"],
    "summary":"Get all sessions",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"array",
            "items":{
            "$ref": "#/definitions/Session"
            }
        
        }
        }
    }

}

export default getSessions;