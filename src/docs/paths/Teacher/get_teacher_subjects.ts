
const getTeacherSubjects ={
    "tags":["Teachers"],
    "summary":"Get all subjects for teacher with given ID",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"array",
            "items":{
            "$ref": "#/definitions/Subject"
            }
        
        }
        }
    }

}

export default getTeacherSubjects;