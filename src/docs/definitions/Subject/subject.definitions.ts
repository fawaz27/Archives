
const subjectdefinitions ={
    "required":["id","name"],
    "properties":{
        "id":{
            "type":"integer",
            "uniqueItems":true
        },
        "name":{
            "type":"string"         
        },
        "classe":{
            "$ref":"#/definitions/Class"
        },
        "teacher":{
            "$ref":"#/definitions/Teacher"
        }
    }
}


export default subjectdefinitions;