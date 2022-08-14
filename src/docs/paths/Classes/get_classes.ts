
const getclasses ={
    "tags":["Classes"],
    "summary":"Get all classes",
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

export default getclasses;