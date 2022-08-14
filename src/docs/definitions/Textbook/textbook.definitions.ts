
const textbookdefinitions ={
    "required":["id"],
    "properties":{
        "id":{
            "type":"integer",
            "uniqueItems":true
        },
        "title":{
            "type":"string"
        },
        "classe":{
            "$ref": "#/definitions/Class"
        },
        "year_academic":{
            "$ref": "#/definitions/Year_Academic"
        }
    }
}


export default textbookdefinitions;