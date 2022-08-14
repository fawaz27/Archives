

const getclass ={
    "tags":["Classes"],
    "summary":"Get class with give ID",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"array",
            "items":{
            "$ref": "#/definitions/Class"
            }
        
        }
        }
    }
}

export default getclass;