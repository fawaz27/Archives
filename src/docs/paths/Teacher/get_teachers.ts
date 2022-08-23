
const getTeachers ={
    "tags":["Teachers"],
    "summary":"Get all Teachers",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"array",
            "items":{
            "$ref": "#/definitions/Teacher"
            }
        
        }
        }
    }

}

export default getTeachers;