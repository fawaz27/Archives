const deleteSession ={
    "tags":["Sessions"],
    "summary":"Delete session with given ID ",
    "responses":{
        "200":{
        "description":"OK",
        "schema":{
            "type":"string",      
        }
        }
    }
}

export default deleteSession;