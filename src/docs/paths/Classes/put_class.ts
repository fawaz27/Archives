const putclass ={
    "tags":["Classes"],
    "summary":"Update class with give ID" ,
    "parameters":[
        {
            "name":"class",
            "in":"body",
            "description":"Class with new values of properties",
            "schema": {
                "$ref": "#/definitions/CreateClassDto"
            }

        }
    ],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{   
            "$ref": "#/definitions/Class"
  
        }
        }
    }
}

export default putclass;