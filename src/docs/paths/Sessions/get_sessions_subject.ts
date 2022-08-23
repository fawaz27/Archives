
const getSessionsSubject ={
    "tags":["Sessions"],
    "summary":"Get all  subject sessions",
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

export default getSessionsSubject;