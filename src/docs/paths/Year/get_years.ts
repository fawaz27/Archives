
const getYears ={
    "tags":["Year"],
    "summary":"Get all years academic",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"array",
            "items":{
            "$ref": "#/definitions/Year_Academic"
            }
        
        }
        }
    }

}

export default getYears;