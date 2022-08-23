

const getYear ={
    "tags":["Year"],
    "summary":"Get year with give ID",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "$ref": "#/definitions/Year_Academic"
        }
        }
    }
}

export default getYear;