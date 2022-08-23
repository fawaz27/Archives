const login ={
    "tags":["Authentification"],
    "summary":"Login ",
    "parameters":[
        {
            "name":"login",
            "in":"body",
            "description": "parameters of login",
            "schema": {
              "$ref": "#/definitions/LoginDto"
            }
        }
    ],
    "responses":{
        "200":{
        "description":"OK",
        "schema":{  
            "$ref": "#/definitions/Teacher"   
        }
        }
    }
}

export default login;