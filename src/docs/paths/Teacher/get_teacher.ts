

const getTeacher ={
    "tags":["Teachers"],
    "summary":"Get Teacher with give ID",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "$ref": "#/definitions/Teacher"
        }
        }
    }
}

export default getTeacher;