
const getTeacherSessions ={
    "tags":["Teachers"],
    "summary":"Get all sessions for teacher with given ID",
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

export default getTeacherSessions;