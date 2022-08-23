

const getSubject ={
    "tags":["Subjects"],
    "summary":"Get subject with give ID",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "$ref": "#/definitions/Subject"
        }
        }
    }
}

export default getSubject;