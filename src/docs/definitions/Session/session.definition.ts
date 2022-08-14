
const sessiondefinitions ={
    "required": ["id","start_time","end_time","duration","point_of_presence","summary_course"],
    "properties":{
        "id":{
            "type":"integer",
            "uniqueItems":true
        },
        "date":{
            "type":"string"
        },
        "start_time":{
            "type":"string"
        },

        "end_time":{
            "type":"string"
        },

        "duration":{
            "type":"string"
        },

        "title":{
            "type":"string"
        },

        "description":{
            "type":"string"
        },

        "annex_document":{
            "type":"string"
        },

        "summary_course":{
            "type":"string"
        },

        "point_of_presence":{
            "type":"string"
        },
        "subject":{
            "$ref": "#/definitions/Subject"
            
        },
        "textbook":{
            "$ref": "#/definitions/Textbook"

        }
    
    }

}

export default sessiondefinitions;