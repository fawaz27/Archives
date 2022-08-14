
const taskdefinitions ={
    "required":["id","name"],
    "properties":{
        "id":{
            "type":"integer",
            "uniqueItems":true
        },
        "name":{
            "type":"string"         
        },
        "date_given":{
            "type":"string"
        },
        "date_submission":{
            "type":"string"
        },
        "statement":{
            "type":"string"
        },
        "document_annex":{
            "type":"string"
        },
        "type":{
            "type":"string"
        },
        "createdAt":{
            "type":"string"
        },
        "session":{
            "$ref":"#/definitions/Session"
        }
    }


}


export default taskdefinitions;