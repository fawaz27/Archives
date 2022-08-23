
const getSubjects ={
    "tags":["Subjects"],
    "summary":"Get all subjects",
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

export default getSubjects;