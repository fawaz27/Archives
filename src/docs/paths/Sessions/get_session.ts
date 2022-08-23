

const getSession ={
    "tags":["Sessions"],
    "summary":"Get session with give ID",
    "parameters":[],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "$ref": "#/definitions/Session"
        }
        }
    }
}

export default getSession;