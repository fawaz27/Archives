
const getTeacherSessions ={
    "tags":["Teachers"],
    "summary":"Get all sessions of one subject  for teacher connected ",
    "parameters":[
        {
            "name":"yearAcademic",
            "in":"query",
            "required": true,
            "description": "The academic year for which you want the sessions",
            "schema": {
              "type": "string"
            }
        }
    ],
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